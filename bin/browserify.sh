#!/bin/bash

source ./bin/util.sh

### transpile ###
browserify src/app.js -o dist/bundle.js --transform [ babelify --presets [ es2015 ] ] --debug || exit 0
success browserify
