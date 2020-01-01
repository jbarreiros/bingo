A silly pile of code trying to pass itself off as a multi-player bingo game.

I wrote this project to mess around with LitElement, web components and CSS-in-JS.

Architecture:
* Server
  * [Express](https://expressjs.com/): serves pages and a websocket
  * Page templates use the [EJS](https://ejs.co/) template engine. Also using [ejs-blocks](https://github.com/sycue/ejs-blocks), which adds "layouts" and "blocks".
* Client
  * Webpack-bundled SPA
  * [LitElement](https://lit-element.polymer-project.org/) for web components

Flaws:
* Game and player state are not persisted in some kind of database. It's just held in memory until the server is rebooted.
* Not optimized, like at all, for any kind of production or high-load environment.
* App only works on browsers that natively support the web components spec. Yes, there are polyfills, but this is an experimental project, so didn't feel like wiring them up.
