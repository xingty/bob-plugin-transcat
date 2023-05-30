#!/bin/bash

version=$1
if [[ -z $version ]]; then
  echo "build [version]"
  exit 0
fi

cd src
zip -r ../build/bob-plugin-transcat-v$version.bobplugin . *
cd ..