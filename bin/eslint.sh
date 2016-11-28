#!/bin/bash

source ./bin/util.sh

### lint ###
eslint "src/**/*.js" || exit 0
success eslint
