#!/bin/bash

if [ -f dist/main.css ]; then

    postcss --use autoprefixer dist/main.css --replace

else 

    exit 1

fi
