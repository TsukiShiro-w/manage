import instance from '@/utils/request.js'

function loginStart(data) {
    return instance({
        url: '/login',
        method: 'post',
        data,
    })
}

export { loginStart };