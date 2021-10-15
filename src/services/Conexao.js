import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_URL_API,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    }
});

// Add a request interceptor
apiClient.interceptors.request.use((config) => {
    const json = localStorage.getItem("__chave_usuario");
    const token = json ? JSON.parse(atob(json)) : null;
    if (token) {
        config.headers.Authorization =  token.token_access;
    }

    return config;
});

export { apiClient };