export const environment = {
    production: true,
    apiRoot: 'https://infosafejiapi.azurewebsites.net',
    azureAD: {
        authority: 'https://login.microsoftonline.com/031162b7-774f-40b2-a8a5-8b979557e49a/v2.0',
        clientId: '8453dda4-8e94-4928-8655-9a29018d2eea',
        redirectUri: 'https://theinfosafe.com/',
        infoSafeApiScope: 'api://6bc1a37b-da3e-4b89-b621-c75c8eebee0a/FullAccess'
    },
    stripe: {
        publicKey: 'pk_live_51PQ0S204Qxx0oOgwVre0TNGZjWhCLtellZCvjueSpK27V3uDFdyEjcjhWCYZ8PYulcppPpNgv12I04o3GkGkcEEJ00D1xwPJne',
    }
};
