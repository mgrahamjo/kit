#!/bin/bash

source ./bin/util.sh

########## JavaScript ##########

### lint ###
./bin/eslint.sh

### transpile ###
browserify src/app.js -o dist/bundle.js --transform [ babelify --presets [ es2015 ] ] || exit 0
success browserify

### minify ###
uglifyjs dist/bundle.js --compress --mangle --output dist/bundle.js || exit 0
success uglify

############# CSS #############

./bin/css.sh

### minify ###
cleancss -o dist/main.css dist/main.css || exit 0
success clean-css
