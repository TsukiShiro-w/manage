import axios from 'axios';
import { Message } from 'element-ui';
// 创建实例时设置配置的默认值
var instance = axios.create({
    //设置基地址
    baseURL: process.env.VUE_APP_URL,
    //跨域照样携带cookie
    withCredentials: true,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
   if (response.data.code == 200) {
       return response.data;
   }else{
       Message.error(response.data.message);
       return Promise.reject('error');
   }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

function getRegisterSms(data) {
    return instance({
        //设置了副本axios.create可省掉process.env.VUE_APP_URL
        url: '/sendsms',
        method: 'post',
        //es6简写
        data,
    });
}

function register(data) {
    return instance({
        url: '/register',
        method: 'post',
        data,
    })
}
export { getRegisterSms, register }