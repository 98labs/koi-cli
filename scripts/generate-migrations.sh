#!/bin/bash

koi=$'\e[0;37;48;5;0mkoi\e[0m'
error=$'\e[0;31;48;5;0mERR!\e[0m'
success=$'\e[0;32;48;5;0mOK!\e[0m'
info=$'\e[0;34;48;5;0mINFO\e[0m'
currentDir=$(dirname $(dirname $0))

abort() {
  echo >&2
  echo "$koi $error An error occcured."
  echo "$koi $error Exit status 1"
  echo ""
  exit 1
}

trap 'abort' 0
set -e
echo $koi $info "Step 1/1: Generating Migration Files"
$currentDir/lib/node_modules/koi-cli/src/generate-migrations.js
echo $koi $success " Success"
trap : 0