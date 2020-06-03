import axios from 'axios';
import { Message } from 'element-ui';
// 创建axios
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devapi';
const instance = axios.create({
    baseURL: BASEURL,
    // 超时
    timeout: 15000 
});

// 创建拦截器
/**
 * 请求接口之前做一些数据处理
 */
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 后台需要前端这边传什么相关的参数（在请求头添加参数）
    config.headers.toKey = '11111111111111';
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
/**
 * 请求接口数据后，进行拦截
 */
instance.interceptors.response.use(function (response) {
    // 可根据业务的一些需求进行操作
    const data = response.data;
    if (data.resCode !== 0) {
        Message.error(data.message);
        return Promise.reject(data);
    } else {
        return response;
    }
}, function (error) {
    return Promise.reject(error);
});

export default instance;