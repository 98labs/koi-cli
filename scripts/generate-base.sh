#!/bin/bash

file=$1
koi=$'\e[0;37;48;5;0mkoi\e[0m'
error=$'\e[0;31;48;5;0mERR!\e[0m'
success=$'\e[0;32;48;5;0mOK!\e[0m'
info=$'\e[0;34;48;5;0mINFO\e[0m'
<<<<<<< HEAD
=======
currentDir=$(dirname $(dirname $0))
>>>>>>> 35bb6b9448d0339e3b379682c93fda5da420c692

abort() {
  echo >&2
  echo "$koi $error An error occcured."
  echo "$koi $error Maybe no migration file: 'create-migration-$file.js' is existing."
  echo "$koi $error Exit status 1"
  echo ""
  exit 1
}

trap 'abort' 0
set -e
echo $koi $info "Step 1/6: Generating Model:" $1".ts"
<<<<<<< HEAD
node ./node_modules/koi-cli/src/generate-models.js $1
=======
$currentDir/lib/node_modules/koi-cli/src/generate-models.js $1
>>>>>>> 35bb6b9448d0339e3b379682c93fda5da420c692
echo $koi $success " Success"
trap : 0

trap 'abort' 0
set -e
echo ""
echo $koi $info "Step 2/6: Generating Controller:" $1"Controller.ts"
<<<<<<< HEAD
node ./node_modules/koi-cli/src/generate-controllers.js $1
=======
$currentDir/lib/node_modules/koi-cli/src/generate-controllers.js $1
>>>>>>> 35bb6b9448d0339e3b379682c93fda5da420c692
echo $koi $success " Success"
trap : 0

trap 'abort' 0
set -e
echo ""
echo $koi $info "Step 3/6: Generating Service:" $1"Service.ts"
<<<<<<< HEAD
node ./node_modules/koi-cli/src/generate-services.js $1
=======
$currentDir/lib/node_modules/koi-cli/src/generate-services.js $1
>>>>>>> 35bb6b9448d0339e3b379682c93fda5da420c692
echo $koi $success " Success"
trap : 0

trap 'abort' 0
set -e
echo ""
echo $koi $info "Step 4/6: Generating Route:" $1".ts"
<<<<<<< HEAD
node ./node_modules/koi-cli/src/generate-routes.js $1
=======
$currentDir/lib/node_modules/koi-cli/src/generate-routes.js $1
>>>>>>> 35bb6b9448d0339e3b379682c93fda5da420c692
echo $koi $success " Success"
trap : 0

trap 'abort' 0
set -e
echo ""
echo $koi $info "Step 5/6: Generating Transformer:" $1"Transformer.ts"
<<<<<<< HEAD
node ./node_modules/koi-cli/src/generate-transformers.js $1
=======
$currentDir/lib/node_modules/koi-cli/src/generate-transformers.js $1
>>>>>>> 35bb6b9448d0339e3b379682c93fda5da420c692
echo $koi $success " Success"
trap : 0

trap 'abort' 0
set -e
echo ""
echo $koi $info "Step 6/6: Updating Index files"
<<<<<<< HEAD
node ./node_modules/koi-cli/src/generate-indexes.js $1
=======
$currentDir/lib/node_modules/koi-cli/src/generate-indexes.js $1
>>>>>>> 35bb6b9448d0339e3b379682c93fda5da420c692
echo $koi $success " Success"
echo ""
trap : 0