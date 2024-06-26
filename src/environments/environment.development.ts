export const environment = {
    production: false,
    apiRoot: 'https://localhost:7186',
    azureAD: {
        authority: 'https://login.microsoftonline.com/031162b7-774f-40b2-a8a5-8b979557e49a/v2.0',
        clientId: '8453dda4-8e94-4928-8655-9a29018d2eea',
        redirectUri: 'http://localhost:4200/',
        infoSafeApiScope: 'api://6bc1a37b-da3e-4b89-b621-c75c8eebee0a/FullAccess'
    },
    stripe: {
        publicKey: 'pk_test_51PQ0S204Qxx0oOgwTPtHhC7DHjaukAVlX6kY5YOaRTC6vtWJolTqIuGG6rDUNuQi4vYD2H4OTWygN1GdmWuUy6Go00p9pJnuYl',
    }
};
