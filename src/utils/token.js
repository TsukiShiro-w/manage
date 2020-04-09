
function saveToken(val) {
    window.localStorage.setItem('token', val);
}

function getToken() {
   return window.localStorage.getItem('token');
}

function removeToken() {
    window.localStorage.removeItem('token')
}

export { saveToken, getToken, removeToken };