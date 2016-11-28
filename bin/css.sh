#!/bin/bash

source ./bin/util.sh

### lint ###
stylelint src/css/**/*.scss || exit 0
success sass-lint

### preprocess ###
sass src/css/main.scss dist/main.css || exit 0
success sass

### autoprefix ###
postcss --use autoprefixer dist/main.css --replace || exit 0
success autoprefixer
