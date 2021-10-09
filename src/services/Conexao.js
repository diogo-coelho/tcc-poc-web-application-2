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

export { apiClient };