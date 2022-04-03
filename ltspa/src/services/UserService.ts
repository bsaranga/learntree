import Keycloak, { KeycloakConfig } from 'keycloak-js';
import config from '../config/keycloak.json';

const kc = Keycloak(config as KeycloakConfig);

export function UserService(authCallBack: any): void {
	kc.init({
		onLoad: 'check-sso',
		silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
	}).then(auth => {
		if (!auth) kc.login();
		else {
			authCallBack();
            
			console.log('Authenticated');
			setTimeout(() => {
				kc.logout();
			}, 5000);
		}
	});
}