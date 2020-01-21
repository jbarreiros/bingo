A silly pile of code trying to pass itself off as a multi-player bingo game. I wrote this project to mess around with web components.

## Architecture

* Server
  * [Express](https://expressjs.com/): serves pages and a websocket
  * Page templates use the [EJS](https://ejs.co/) template engine. Also using [ejs-blocks](https://github.com/sycue/ejs-blocks), which adds "layouts" and "blocks".
* Client
  * Webpack-bundled SPA
  * [LitElement](https://lit-element.polymer-project.org/) for web components

## Flaws

* Game and player state are not persisted in some kind of database. It's just held in memory until the server is rebooted.
* Not optimized, like at all, for any kind of production or high-load environment.
* App only works on browsers that natively support the web components spec. Yes, there are polyfills, but this is an experimental project, so didn't feel like wiring them up.

## Getting Started

```
npm install

// start development environment
npm run dev

// "production" build
npm run build

// start production environment
npm start
```

## Nginx Example

_Using Nginx as a reverse proxy for the Express server._

```nginx
server {
  server_name <hostname>;

  gzip_vary on;
  gzip_proxied any;
  gzip_comp_level 6;
  gzip_buffers 16 8k;
  gzip_http_version 1.1;
  gzip_min_length 256;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript application/vnd.ms-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon;

  location ~ \.(js|css|ico)$ {
    root /var/www/<hostname>/public;
    access_log on;
    error_log on;
    expires 5m;
  }

  location / {
    root /var/www/<hostname>;

    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';";

    proxy_pass http://localhost:8080;

    # websocket
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  listen [::]:443 ssl;
  listen 443 ssl;
  # use LetsEncrypt Certbot to manage SSL
}

server {
  if ($host = <hostname>) {
    return 301 https://$host$request_uri;
  }

  listen 80;
  listen [::]:80;

  server_name <hostname>;

  return 404;
}
```
