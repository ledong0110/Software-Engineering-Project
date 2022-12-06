import axios from "axios";
const BASE_URL = 'http://192.168.1.118:3000'
// const BASE_URL = '/';

export default axios.create({
	baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});
