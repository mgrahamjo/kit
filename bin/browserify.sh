#!/bin/bash

source ./bin/util.sh

### transpile ###
browserify src/universal/app.js -o src/universal/dist/bundle.js --transform [ babelify --presets [ es2015 ] ] --debug || exit 0
success browserify
