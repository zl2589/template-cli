/**
 * @description 下一代 Ajax
 */
import _ from 'lodash';

export const controller = new AbortController();
const signal = controller.signal;
// controller.abort() 终止请求


/**
 * @description json 转 FormData
 * @param {*} jsonData
 * @returns
 */
export const json2formData = (jsonData: Object) => {
    const formData = new FormData();
    _.forEach(jsonData, (value: any, key: string) => formData.append(key, value));
    return formData;
};

/**
 * @description 支持 body 统一设置为 json 格式
 * @param {*} param0
 * @returns
 */
interface SetBodyProps {
    contentType: string
    body: Object
}
const setBody = ({ contentType, body }: SetBodyProps) => {
    if (!contentType) return;
    if (!body) return;

    const dict: any = {
        "application/json": JSON.stringify(body),
        "application/x-www-form-urlencoded": json2formData(body),
        "multipart/form-data": json2formData(body),
    };

    return dict[contentType];
}

interface FetchOptions {
    method?: string
    credentials?: RequestCredentials
    mode?: RequestMode
    redirect?: RequestRedirect
    headers?: HeadersInit
    signal?: AbortSignal
    body?: BodyInit | null
}

export default (url: string, options?: FetchOptions) => {
    return new Promise((resolve, reject) => {
        if (!url) {
            reject({ msg: "bad request", status: 400 });
        }

        let headers: HeadersInit = _.get(options, "headers", {
            // "Content-Type": "application/json", <= POST => body: JSON.stringify({})
            // "Content-Type": "application/x-www-form-urlencoded", <= POST => body: new FormData()
            // "Content-Type": "multipart/form-data",
            // "Content-Type": "text/plain",
            // "Content-Type": "text/html", <= GET
            "Content-Type": _.get(options, "headers['Content-Type']", "application/json") || _.get(options, "headers['content-type']", "application/json")
        });

        let fetchOptions: FetchOptions = {
            method: _.get(options, "method", 'GET'),
            signal: signal,
            credentials: _.get(options, "credentials", "include"),
            headers: headers,
            mode: _.get(options, "mode", "cors"),
            redirect: _.get(options, "redirect", 'follow'),
        };

        if (_.includes(["get", "GET"], _.get(options, "method", 'GET'))) {
            var searchQuery = _.join(_.map(_.get(options, 'body'), (value: any, key: string) => `${key}=${value}`), '&');
            if (searchQuery) {
                url += `?${searchQuery}`;
            }
        }
        else {
            const bodyData = _.get(options, "body", {});
            // 如果已经设置成 FormData
            if (_.isObject(bodyData) && (bodyData instanceof FormData)) {
                _.set(fetchOptions, "headers['Content-Type']", "mutipart/form-data");
            }

            else {
                // 默认情况下 fetch 的 Content-Type 设置为 application/json，其他情况需要自行设置 Content-Type
                let contentType = _.lowerCase(_.get(headers, "Content-Type"));
                _.set(fetchOptions, "body", setBody({ contentType, body: bodyData }))
            }
        }

        fetch(url, {
            ...fetchOptions
        }).then(res => {
            if (res?.json) {
                return res.json();
            }

            else if (res?.text) {
                return res.text();
            }

            else if (res?.formData) {
                return res.formData();
            }

            else if (res?.blob) {
                return res.blob();
            }

            else if (res?.arrayBuffer) {
                return res.arrayBuffer();
            }

        }).then(data => {
            // 进行一些处理
            resolve(data);
        }).catch(error => {
            // 进行一些错误处理
            reject(error);
        })
    });
}