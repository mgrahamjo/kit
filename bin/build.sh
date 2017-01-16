#!/bin/bash

. ./bin/util.sh

### Prepare workspace ###
./bin/ws/prepare.sh

########## JavaScript ##########

### lint ###
attempt eslint
./bin/js/eslint.sh && success || fail

### transpile ###
attempt browserify
./bin/js/browserify.prod.sh && success || fail

### minify ###
attempt uglifyjs
uglifyjs dist/bundle.js --compress --mangle --output dist/bundle.js && success || fail

############# CSS #############

### lint ###
attempt stylelint
./bin/css/stylelint.sh && success || fail

### compile ###
attempt sass
./bin/css/sass.sh && success || fail

### autoprefix ###
attempt autoprefix
./bin/css/autoprefix.sh && success || fail

### minify ###
attempt cleancss
cleancss -o dist/main.css dist/main.css && success || fail

############# HTML #############

### Insert constants ##
attempt constants
./bin/html/constants.sh && success || fail

### Minify HTML ###
attempt html-minifier
./bin/html/minify.sh && success || fail

### Hash filenames ###
attempt hash-filename
./bin/html/hash-filename.sh && success || fail

### Clean up temp files ###
rm dist/bundle.js dist/main.css
