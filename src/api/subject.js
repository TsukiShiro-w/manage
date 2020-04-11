import instance from '@/utils/request.js'

function getSubjectList(params) {

    return instance({
        url:'/subject/list',
        method:'get',
        params,
    })
}

export {getSubjectList};