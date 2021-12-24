import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fitmanager-server.herokuapp.com/',
});

export default api;