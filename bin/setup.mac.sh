#!/bin/bash

source ./bin/util

cd_to_root

missing() {
  if command -v $1 >/dev/null 2>&1; then
    print_blue "$1 is already installed"
    return 1
  else
    print_blue "installing $1..."
    return 0
  fi
}

if missing brew; then
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi

if missing git; then
  brew install git
fi

if missing node; then
  brew install node
fi

if missing yarn; then
  brew install yarn
fi

if missing sass; then
  gem install sass
fi

yarn

npm run build
