#!/usr/bin/env node

const fileName = process.argv[2];
require('shelljs').exec(`${__dirname}/scripts/generate.sh ${fileName}`, {async: true})
