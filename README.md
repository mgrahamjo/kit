# Kit

Scaffolds a universal single page app using [Oat](https://github.com/mgrahamjo/oat) on [Express](http://expressjs.com), with the following tooling:

- Transpiles ES6 with Babel
- Bundles CommonJS modules with Browserify
- Lints JavaScript with ESlint
- Minifies JavaScript with UglifyJS
- Compiles Sass
- Lints Sass with Stylelint
- Autoprefixes CSS
- Minifies CSS with clean-css
- Installs Yarn for dependency management

## Install

```
git clone https://github.com/mgrahamjo/kit && ./kit/bin/setup.sh
```

## Develop

```bash
# Watch files for changes:
npm run watch
# Start server:
node .
# Build for production:
npm run build
```
