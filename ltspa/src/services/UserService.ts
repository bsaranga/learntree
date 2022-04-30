/* eslint-disable @typescript-eslint/no-explicit-any */
import Keycloak, { KeycloakConfig, KeycloakTokenParsed } from 'keycloak-js';
import config from '../config/keycloak.json';
import IParsedIdToken from '../interfaces/service-interfaces/user-service/IParsedIdToken';

const kc = Keycloak(config as KeycloakConfig);

function initKeyCloak(appRenderCallBack: any): void {
	kc.init({
		onLoad: 'check-sso',
		silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
		pkceMethod: 'S256'
	}).then(auth => {
		!auth ? kc.login({loginHint: 'admin'}) : appRenderCallBack();
	}).catch(console.error);
}

function doLogin(loginHint?: string): void {
	loginHint ? kc.login({loginHint: loginHint}) : kc.login();
}

function doLogout(): void {
	kc.logout();
}

function loadUserProfile() {
	kc.loadUserProfile().then(p => console.log(p));
}

function getUserInfo() {
	return kc.userInfo;
}

function getParsedIdToken(): IParsedIdToken | undefined {
	return kc.idTokenParsed;
}

function getToken(): string | undefined {
	return kc.token;
}

function getParsedToken(): KeycloakTokenParsed | undefined {
	return kc.tokenParsed;
}

function getUsername(): string | undefined {
	return kc.tokenParsed?.preferred_username;
}

function updateToken(successCallback: any) {
	return kc.updateToken(5)
		.then(successCallback)
		.catch(doLogin);
}

function isAuthenticated(): boolean | undefined {
	return kc.authenticated;
}

const UserService = {
	initKeyCloak,
	doLogin,
	doLogout,
	getParsedIdToken,
	getToken,
	getUsername,
	getParsedToken,
	updateToken,
	isAuthenticated,
	getUserInfo,
	loadUserProfile
};

export default UserService;