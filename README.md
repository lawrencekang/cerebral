# cerebral

Chat demo app for Cerebral.  

Uses webpack dev server for building the React + Redux app and serving the app locally.

[App logic and additional information available here](client/src/store/README.md).

`npm install`

`npm run start:dev` to start webpack dev server

https://localhost:8081 to access app

## Additional requirements cut for time

Testing - I opted for feature completion over testing, but would use Enzyme and jest testing for React and Redux.

Further styling - I approximated the Cerebral brand colors and simplified the mock up of the Chat UI that was provided.

Better validation - I would make the chat input validation more robust, including doing things like stripping out special characters (punctuation) to ensure better compatibility with how people type.
