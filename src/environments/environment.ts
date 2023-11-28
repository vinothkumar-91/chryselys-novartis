// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverDomain:'http://localhost',
  serverPort:'82',
  userManagementDomain:'http://localhost',
  userManagementPort:'81',
  samlURL:"http://localhost:8080/login",
  autofeedback:['Answer not accurate','Should elaborate more','Should be more concise'],
  sampleQus:['What core values drive mCRPC treaters decision-making in prostate cancer generally, and in early-line mCRPC specifically?','How do the respondent values play out in the selection of specific treatment options, including sequential ARPIs and chemo?']
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
