import { BrowserCacheLocation } from "@azure/msal-browser";
import { environment } from "../../../environments/environment";

const isIE =
    window.navigator.userAgent.indexOf("MSIE ") > -1 ||
    window.navigator.userAgent.indexOf("Trident/") > -1;

export const msalConfig = { // MSAL Configuration
    auth: {
        clientId: environment.azureAD.clientId,
        authority: environment.azureAD.authority,
        redirectUri: environment.azureAD.redirectUri,
        // postLogoutRedirectUri: "http://localhost:4200/"
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: isIE,
    }
}

export const protectedResources = {
    todoListApi: {
        endpoint: 'https://graph.microsoft.com/v1.0/me',
        scopes: ['user.read'],
    },
}

export const loginRequest = {
    scopes: [environment.azureAD.infoSafeApiScope]
}