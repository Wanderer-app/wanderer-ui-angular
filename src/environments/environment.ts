// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  userContentApiUrl: "http://localhost:8080/api/",
  userApiUrl: "http://127.0.0.1:5000/api/v1/",
  firebaseConfig: {
    apiKey: "AIzaSyD24DhMzVpRtRirIJkdPb4DYw6VUmiAun0",
    authDomain: "wanderer-ui.firebaseapp.com",
    projectId: "wanderer-ui",
    storageBucket: "wanderer-ui.appspot.com",
    messagingSenderId: "65433593415",
    appId: "1:65433593415:web:b0d5ab6de51bd0e9d17362"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
