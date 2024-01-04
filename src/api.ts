import { notEmpty } from "./arrays";
import { write, writeArrayBuffer } from "./fs";
import { log } from "./logs";
import fetcher from "./net";

type AudioUrl = {
    title: string,
    url: string
}

type Collection = {
    id: string,
    title: string
}

type Episode = Collection;


async function fetchEpisodes(collection_id: Collection['id']): Promise<Array<Episode> | null> {
    const url = `https://api.vistopia.com.cn/api/v1/content/article_list?content_id=${collection_id}&count=100&sort=0&reverse=0&since_id=473994&is_all_data=1`;
    const res = await fetcher.get(url);
    // @ts-ignore
    const artiles = res?.data?.article_list;
    if (artiles) {
        const episodes = artiles
            .map((val: any) => {
                return {
                    id: val.article_id,
                    title: val.title
                }
            })
        log(`episodes: ${JSON.stringify(episodes, null, 2)}`);
        return episodes;
    }
    return null;
}

async function fetchOneEpisode(episode_id: Episode['id']): Promise<AudioUrl | null> {
    const url = `https://api.vistopia.com.cn/api/v1/reader/section-detail?article_id=${episode_id}`;
    const res = await fetcher.get(url);
    // @ts-ignore
    if (res?.data?.part) {
        // @ts-ignore
        const part = res?.data?.part[0];
        const { title, optional_media_key_full_url } = part;
        const AudioUrl = {
            title,
            url: optional_media_key_full_url
        }
        console.log(`AudioUrl: ${JSON.stringify(AudioUrl)}`);
        return AudioUrl;
    }
    return null;
}

async function downloadAudio(audioUrl: AudioUrl) {
    const { title, url } = audioUrl || {};
    const res = await fetcher.download(url);
    writeArrayBuffer(`./resources/${title}.mp3`, res);
}

async function fetchAudiosFromCollection(collection_id: Collection['id']) {
    const episodes = await fetchEpisodes(collection_id);
    if (episodes) {
        const len = episodes.length;
        let index = 0;
        for (let episode of episodes) {
            const audioUrl: AudioUrl = await fetchOneEpisode(episode.id);
            const { title } = audioUrl || {};
            console.log(`start download ${title}`);
            await downloadAudio(audioUrl);
            console.log(`${title}.mp3 download successfully.`);
            ++index;
        }
        if (len === len) {
            console.log(`all episodes download finished.`);
        } else {
            console.log(`download occur errors, success count: ${index}, failure count: ${len - index} please run again.`);
        }
        // episodes.forEach(async (episode_id: string) => {
        //     const audioUrl: AudioUrl = await requestEpisode(episode_id);
        //     await downloadAudio(audioUrl);
        // });
    }
}

async function search(keyword: string, page: number = 1): Promise<Collection[] | null> {
    const collections: Collection[] = [];
    await searchByRecusively(keyword, page, collections);
    console.log(`collection_ids: ${JSON.stringify(collections, null, 2)}`);
    return collections;
}

async function searchByRecusively(keyword: string, page: number, result: Collection[]) {
    const url = `https://api.vistopia.com.cn/api/v1/search/search-new?page=${page}&keyword=${encodeURI(keyword)}`;
    const res = await fetcher.get(url)
    // @ts-ignore
    const array = res?.data.data;
    // @ts-ignore
    const lastPage = res?.data?.last_page;
    if (page > lastPage) {
        return;
    }
    if (notEmpty(array)) {
        const collection_ids = array
            .filter((val: any) => val.data_type === 'content')
            .map((val: any) => {
                const { id, title } = val || {};
                return {
                    id,
                    title
                };
            });
        // log(`page: ${page}, collection_ids: ${JSON.stringify(collection_ids)}`);
        result.push(...collection_ids);
        // resursive
        await searchByRecusively(keyword, page + 1, result);
    }
}

// search
// https://api.vistopia.com.cn/api/v1/search/search-new?page=1&keyword=%E8%91%9B%E5%85%86%E5%85%89

//sig 277c9b46f0d18fe919e3ccb4b9574540


// sms-code
// url https://api.vistopia.com.cn/api/v1/service/sms-code
// method: post
// body json : phone=13753251592&type=login_or_register&area_code=86


// auth
// url: https://api.vistopia.com.cn/api/v1/auth/post-register-login?phone=13753251592&code=780632&area_code=86
// method: post
// body json: {}

// episode
// url: https://api.vistopia.com.cn/api/v1/reader/section-detail?article_id=152451


export {
    fetchAudiosFromCollection,
    search,
    fetchEpisodes,
}