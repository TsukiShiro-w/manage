import instance from '@/utils/request.js';

function getUserListData(params) {
    return instance({
        url: '/user/list',
        method: 'get',
        params,
    })
}
function delUserListData(data) {
    return instance({
        url:"/user/remove",
        method:'post',
        data,
    })
    
}
function setUserStatus(data) {
    return instance({
        url:"/user/status",
        method:'post',
        data
    })
}
function addUser(data) {
    return instance({
        url:'/user/add',
        methods:'post',
        data
    })
}
export { getUserListData,delUserListData,setUserStatus,addUser }