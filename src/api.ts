import { write, writeArrayBuffer } from "./fs";
import fetcher from "./net";

type AudioUrls = {
    name: string,
    url: string
}

async function requestArticle(): Promise<Array<AudioUrls> | null> {
    const url = "https://api.vistopia.com.cn/api/v1/content/article_list?content_id=47&count=100&åsort=0&reverse=0&since_id=473994&is_all_data=1";
    const res = await fetcher.get(url);
    write('./json/article.json', JSON.stringify(res));
    console.log("write json successfully.");
    // @ts-ignore
    const artiles = res?.data?.article_list;
    if (artiles) {
        const audioUrls = artiles
            .map((val: any) => {
                return {
                    name: val?.title,
                    url: val?.optional_media_key_full_url
                }
            })
        console.log(`audioUrls: ${JSON.stringify(audioUrls)}`);
        return audioUrls;
    }
    return null;
}

function downloadAudios(audios: Array<AudioUrls>) {
    audios.forEach(async (val: { name: string, url: string }, index: number) => {
        const { name, url } = val || {};
        const res = await fetcher.download(url);
        writeArrayBuffer(`./resource/${name}`, res);
        console.log(`${name} download successfully.`);
    });
}

async function fetchAudios() {
    const audioUrls = await requestArticle();
    if (audioUrls !== null) {
        downloadAudios(audioUrls);
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

export {
    fetchAudios
}