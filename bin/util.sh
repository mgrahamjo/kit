#!/bin/bash

print_blue() {
  printf "\033[0;36m$1\033[0m\r\n"
}

success() {
  print_blue "✓ $1 succeeded"
}

cd_to_root() {
  cd "$(dirname "$0")" && cd ..
}

missing() {
  if command -v $1 >/dev/null 2>&1; then
    print_blue "$1 is already installed"
    return 1
  else
    print_blue "installing $1..."
    return 0
  fi
}
