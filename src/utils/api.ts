import axios from 'axios';
import constants from 'expo-constants';

const api = axios.create({
    baseURL: constants.manifest.extra.baseURL,
});

export default api;