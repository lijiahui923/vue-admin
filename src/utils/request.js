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
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
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