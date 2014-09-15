# Facebook React Starter Kit

> This project template is a skeleton for a typical web application or
> single-page application (SPA) based on Facebook React. You can use it
> to quickly bootstrap your web application projects. It contains only
> client-side components and development tools and is recommended to be
> paired with a server-side project similar to
> [ASP.NET Web Application Starter Kit](https://github.com/kriasoft/AspNet-Server-Template).

**Source**: [https://github.com/kriasoft/react-seed](https://github.com/kriasoft/React-Seed)

### Technology Stack

**Runtime components**<br />
[React](https://facebook.github.io/react/),
[React-Router](https://github.com/rackt/react-router),
[Bootstrap](http://getbootstrap.com/) (optional)

**Development tools**<br />
[Gulp](http://gulpjs.com/) (build tool),
[Webpack](http://webpack.github.io/) (bundler),
[BrowserSync](http://www.browsersync.io/) (dev server),
[Karma](http://karma-runner.github.io/) (coming),
[Protractor](https://github.com/angular/protractor) (coming)

### Directory Layout

```
.
├── /build/                     # The folder for compiled output
├── /config/                    # Configuration files for Webpack, Karma etc.
├── /docs/                      # Documentation files
├── /node_modules/              # Node.js-based dev tools and utilities
├── /src/                       # The source code of the application
│   ├── /assets/                # Static files which don't require pre-processing
│   ├── /data/                  # Data access layer and models
│   ├── /common/                # Utility classes etc.
│   ├── /components/            # React components. E.g. Navbar.jsx
│   ├── /images/                # Graphics (.png, .jpg, .svg etc.)
│   ├── /layouts/               # Layouts for web pages
│   ├── /pages/                 # Web pages. E.g. Profile.jsx (or .html, .jade etc.)
│   ├── /services/              # Services and business logic
│   ├── /styles/                # LESS style sheets (or SASS/SCSS, Stylus etc.)
│   ├── /404.html               # 'Page not found' page
│   ├── /app.jsx                # Entry point / bootstrap script
│   └── /index.html             # Home page of a single-page application (SPA)
├── /test/                      # Unit, integration and load tests
│   ├── /e2e/                   # End-to-end tests
│   └── /unit/                  # Unit tests
│── gulpfile.js                 # Configuration file for automated builds
└── package.json                # The list of 3rd party libraries and tools
```

### Getting Started

Just clone or [fork](https://github.com/kriasoft/React-Seed/fork) the repo and start hacking:

```shell
$ git clone -o upstream https://github.com/kriasoft/React-Seed MyApp
$ cd MyApp
$ npm install -g gulp           # Install Gulp task runner globally
$ npm install                   # Install Node.js components listed in ./package.json
```

### How to Build

```shell
$ gulp build                    # or, `gulp build --release`
```

By default, it builds in debug mode. If you need to build in release mode, add
`--release` flag.


### How to Run

```shell
$ gulp                          # or, `gulp --release`
```

This will start a lightweight development server with LiveReload and
synchronized browsing support across multiple devices and browsers.

### How to Deploy

```shell
$ gulp deploy                   # or, `gulp deploy --production`
```

You can deploy to different destinations by adding a corresponding flag.
For example `--production` or `--staging` etc. See the 'deploy' task in
`gulpfile.js`.

### How to Update

You can always fetch and merge the recent changes from this repo back into
your own project:

```shell
$ git checkout master
$ git fetch upstream
$ git merge upstream/master
$ npm install
```

### Contributors

Konstantin Tarkus — [@koistya](https://twitter.com/koistya)

### Support

Have questions, feedback or need help? Contact [support@kriasoft.com](mailto:support@kriasoft.com)
or schedule a mentoring session on [codementor.io/koistya](https://www.codementor.io/koistya).

### Copyright

Source code is licensed under the MIT License. See [LICENSE.txt](./LICENSE.txt)
file in the project root. Documentation to the project is licensed under the
[CC BY 4.0](http://creativecommons.org/licenses/by/4.0/) license. React logo
image is a trademark of Facebook, Inc.
