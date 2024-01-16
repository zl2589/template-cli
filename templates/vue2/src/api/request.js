import axios from 'axios'

let baseUrl = process.env.BASE_API
// console.log('请求url', baseUrl)
const service = axios.create({
    // baseURL: baseUrl,
    timeout: 10000
})

service.interceptors.request.use(config => {


    return config
}, error => {
    Promise.reject(error)
})

service.interceptors.response.use(response => {
    const res = response.data
    // console.log('客户端请求结果', res)
    return res
}, error => {
    Promise.reject(error)
})

export default service