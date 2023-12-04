import axios, { AxiosInstance } from 'axios';
// import { getItem } from '../helpers/storage';

const instance: AxiosInstance = axios.create();

instance.defaults.baseURL = 'https://0001.uz';

// instance.interceptors.request.use(config => {
//     const token = getItem('token');
//     const authorization = token ? `Token ${token}` : '';
//     config.headers.Authorization = authorization;
//     return config;
// });


export default instance;
