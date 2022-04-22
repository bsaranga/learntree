/* eslint-disable @typescript-eslint/no-explicit-any */
import Keycloak, { KeycloakConfig } from 'keycloak-js';
import config from '../config/keycloak.json';

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

function getToken(): string | undefined {
	return kc.token;
}

function getParsedToken(): Keycloak.KeycloakTokenParsed | undefined {
	return kc.tokenParsed;
}

function getUsername(): string | undefined {
	return kc.tokenParsed?.preferred_username;
}

const UserService = {
	initKeyCloak,
	doLogin,
	doLogout,
	getToken,
	getUsername,
	getParsedToken
};

export default UserService;