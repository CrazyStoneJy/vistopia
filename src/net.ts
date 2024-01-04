import { logN } from "./logs";

export type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue }

interface IRequest {
    get(url: string): Promise<JSONValue>
    post(url: string, bodyJson: JSONValue): Promise<JSONValue>
    download(url: string): Promise<ArrayBuffer>
}

class Fetcher implements IRequest {

    get(url: string, customConfig?: any): Promise<JSONValue> {
        return this.request(url);
    }

    post(url: string, bodyJson: JSONValue): Promise<JSONValue> {
        return this.request(url, bodyJson);
    }

    async download(url: string): Promise<ArrayBuffer> {
        const config = {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.63 Safari/537.36'
            },
        }
        const response = await fetch(url, config);
        return response.arrayBuffer();
    }

    async request(url: string, bodyJson?: JSONValue, customConfig?: any): Promise<JSONValue> {
        let config: any = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.63 Safari/537.36'
            },
        };
        if (bodyJson) {
            config = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.63 Safari/537.36'
                },
                body: JSON.stringify(bodyJson)
            }
        }
        config = { ...config, ...customConfig };
        // logN('config: ', config);
        logN('url:', url);
        const response = await fetch(url);
        return response.json();
    }
}
const fetcher = new Fetcher();
export default fetcher;