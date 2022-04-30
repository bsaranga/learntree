/* eslint-disable semi */

import { KeycloakTokenParsed } from 'keycloak-js';

export default interface IParsedIdToken extends KeycloakTokenParsed {
    profile_image?: string,
    name?: string,
    given_name?: string
}