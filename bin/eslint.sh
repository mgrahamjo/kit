#!/bin/bash

source ./bin/util.sh

### lint ###
eslint "src/**/*.js" --ignore-pattern "src/universal/dist/*" || exit 0
success eslint
