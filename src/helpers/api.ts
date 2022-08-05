import axios from 'axios';
import { config } from 'constants/config';

const api = axios.create({
	baseURL: config.BASE_URL,
});

const authApi = axios.create({
	baseURL: config.BASE_URL,
});

const setAuth = async (token: string) => {
	authApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	return;
};

export { api, authApi, setAuth };
