import instance from '@/utils/request.js'

function getChartData(data) {
    return instance({
        url: '/data/title',
        method: "post",
        data,
    })
}
function getBusinessTitle(data) {
    return instance({
        url: '/data/statistics',
        method: 'post',
        data,
    })
}
function hotCityTitle(data) {
    return instance({
        url: '/data/hot_cities',
        method: 'post',
        data
    })
}
export {getChartData,getBusinessTitle,hotCityTitle}