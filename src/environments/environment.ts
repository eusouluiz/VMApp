// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhdHNwam9vZGVxaGJodWJkZ3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwNDYyODIsImV4cCI6MjAwNzYyMjI4Mn0.nCCmUhIAtrW0csSC6y_erJ_H7UpaGxXHC6ON4AYk7tY',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
