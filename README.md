# daredrop-task-manager
Simple task manager built on top of Google Cloud functions (firebase and firestore).

## Things that were not done
### Security
It was not written on requirements, even though it is always good to do them. Unfortunatelly, I did not have enough available time this week :(

Filtering. Currently we can filter by `isDone`. This api should also filter by substrings for `name` and `description`.
I wrote this code to be executed on top of [firebase emulator](https://firebase.google.com/docs/emulator-suite), so it would be easier for daredrop's devs to test/verify if it works. Firebase emulator does not support field indexing. Because of this, we cant query by substring.

## Insomnia files
This repository contains 2 [insomnia](https://insomnia.rest/) files.
- `insomnia_local.json`, to be used when running locally
- `insomnia_remote.json`, to be used against my current deploy.

## Running locally
To run locally we can make use of [firebase emulator](https://firebase.google.com/docs/emulator-suite).

Requirements:
- Node 16+
- Java Runtime (yeaah... this sucks)

## Running tests
Requirements:
- Node 16+
- Java Runtime

cd to `functions` directory and run `npm run test`

## Deploying

Install firebase tools:
`npm install -g firebase-tools`

Then, login to firebase `firebase login`.

Create a firebase project `firebase projects:create`.

Use/enable the project you created for this code: `firebase use project-name-just-created`.

cd to `functions` and run `npm run deploy`. If Blaze is active on your account, the deploy will be successful. If not, the console will inform you. Just click on the link and enable it. After enabling, run the deploy command again.

Go to your project's overview, select **Cloud Firestore** and create a new database.
Firebase you prompt you for **production** or **test**. **test** should be fine.

If **production** was select, you must configure your **firestore's rules**. Go to your project's overview, select **Cloud Firestore** and click on rules.

Update the code you see there to the following and then publish:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Things should be running succesfully now.