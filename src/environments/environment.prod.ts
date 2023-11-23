export const environment = {
  production: false,
  api: {
    endpoint: 'https://vmapi.fly.dev/api',
    maxWaiting: 10000,
    authHeader: 'Authorization',
  },
  log: {
    enabled: false,
    payload: {},
  },
  availableLanguages: ['br', 'en'],
  supabaseUrl: 'https://uatspjoodeqhbhubdgrh.supabase.co',
  supabaseKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhdHNwam9vZGVxaGJodWJkZ3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwNDYyODIsImV4cCI6MjAwNzYyMjI4Mn0.nCCmUhIAtrW0csSC6y_erJ_H7UpaGxXHC6ON4AYk7tY',
};
