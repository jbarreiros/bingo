A silly pile of code trying to pass itself off as a multi-player bingo game. I wrote this project to mess around with React and Redux.

## Architecture

* Server
  * [Express](https://expressjs.com/): serves pages and a websocket
  * Page templates use the [EJS](https://ejs.co/) template engine. Also using [ejs-blocks](https://github.com/sycue/ejs-blocks), which adds "layouts" and "blocks".
* Client
  * React app bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Flaws
