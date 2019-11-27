#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');

function header() {
  console.log(
    chalk.yellow(
      figlet.textSync('Koi', { horizontalLayout: 'full' }),
      '\n A simple CLI made to generate base files and migration files',
      '\n By: 98Labs, Inc',
      '\n Repo: https://github.com/98labs/koi-cli.git\n'
    )
  );
}

module.exports = header