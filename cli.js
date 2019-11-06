#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('Koi', { horizontalLayout: 'full' }),
    '\n A simple CLI made to generate base files and migration files',
    '\n Must be used with koa-typescript-api-v2 (https://code.98labs.com/boilerplates/koa-typescript-api-v2.git)',
    '\n By: 98Labs, Inc',
    '\n Repo: https://code.98labs.com/koi/koi-cli.git'
  ),
  chalk.white(
    '\n -----------------------------------------------------------------',
    '\n',
    '\n Commands:',
    '\n   - koi-generate:base <fileName>   Run to generate base files (models, controllers, routes, transformers, services)',
    '\n                                    example: koi-generate:base user',
    '\n',
    '\n   - koi-generate:migration <fileName>   Run to generate migration file for sequelize to use',
    '\n                                         example: koi-generate:migration user',
    '\n',
    '\n -----------------------------------------------------------------'
    )
);