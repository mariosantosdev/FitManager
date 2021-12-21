import axios from 'axios';
import { BASE_URL } from '@env';

const api = axios.create({
    baseURL: BASE_URL ? BASE_URL : 'http://localhost:3000',
});

export default api;