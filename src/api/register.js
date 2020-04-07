import axios from 'axios';

function getRegisterSms(data){
    return axios({
        url:process.env.VUE_APP_URL + '/sendsms',
        method:'post',
        data:data,
        withCredentials:true,
    });
}
export default getRegisterSms;