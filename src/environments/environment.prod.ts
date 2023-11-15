export const environment = {
  production: true,
  api: {
    endpoint: 'https://vmapi.fly.dev/api',
    maxWaiting: 10000,
    authHeader: 'Authorization',
  },
  log: {
    enabled: true,
    payload: {},
  },
  availableLanguages: ['br', 'en'],
};
