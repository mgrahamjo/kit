#!/bin/bash

source ./bin/util.sh

########## JavaScript ##########

### lint ###
./bin/eslint.sh

### transpile ###
browserify src/universal/app.js -o src/universal/dist/bundle.js --transform [ babelify --presets [ es2015 ] ] || exit 0
success browserify

### minify ###
uglifyjs src/universal/dist/bundle.js --compress --mangle --output src/universal/dist/bundle.js || exit 0
success uglify

############# CSS #############

./bin/css.sh

### minify ###
cleancss -o src/universal/dist/main.css src/universal/dist/main.css || exit 0
success clean-css
