import UserService from './UserService';
import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(cfg => {
	if(UserService.isAuthenticated()) {
		const successCb = () => {
			cfg.headers = {'Authorization':`Bearer ${UserService.getToken()}`};
			return Promise.resolve(cfg);
		};
		return UserService.updateToken(successCb);
	}
});

const client = () => instance;

const HttpService = { client };

export default HttpService;