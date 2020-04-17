import instance from '@/utils/request.js'

// 获取列表
function getQuestionList(params) {
    return instance({
        url: '/question/list',
        method: 'get',
        params,
    })
}
//设置状态
function setQuestionStatus(data) {
    return instance({
        url: '/question/status',
        method: 'post',
        data,
    })
}
// 删除
function delQuestionData(data) {
    return instance({
        url: '/question/remove',
        method: 'post',
        data
    })
}
// 新增
function addQuestionData(data) {
    return instance({
        url: '/question/add',
        method: 'post',
        data
    })
}
// 编辑接口
function editQuestionData(data) {
    return instance({
        url: '/question/edit',
        method: 'post',
        data
    })
}
// 文件上传
function QuestionUpload(data) {
    return instance({
        url: '/question/upload',
        method: 'post',
        data
    })
}
//获取题目信息
function getQuestionInfo(data) {
    return instance({
        url:"/question/one",
        method:'post',
        data,
    })
}

export { getQuestionList, setQuestionStatus, delQuestionData, addQuestionData,editQuestionData,QuestionUpload,getQuestionInfo };