import instance from '@/utils/request.js'

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