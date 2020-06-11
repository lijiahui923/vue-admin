import Cookie from "cookie_js";

export function getToken () {
    return Cookie.get('token');
}

export function setToken (token) {
    return Cookie.set('token',token);
}

export function removeToken (token) {
    return Cookie.remove(token);
}

export function getUsername () {
    return Cookie.get('username');
}

export function setUsername (username) {
    return Cookie.set('username',username);
}

export function removeUsername (username) {
    return Cookie.remove(username);
}