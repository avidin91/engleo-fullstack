import axios from 'axios';
import { getTokenFromLocalStorage } from '@shared/utils/localstorage.helper';

export const instance = axios.create({
	baseURL: 'http://localhost:3009/api',
	headers: {
		Authorization: 'Bearer ' + getTokenFromLocalStorage(),
	},
});
