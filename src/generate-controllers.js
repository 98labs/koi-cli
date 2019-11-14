#!/usr/bin/env node

const fs = require('fs');
const fileName = process.argv[2];
const className = process.argv[2].charAt(0).toUpperCase() + process.argv[2].slice(1);
const currentDir = process.cwd()
fs.mkdirSync(`${currentDir}/src/controllers/v1`, {recursive: true})

fs.writeFileSync(`${currentDir}/src/controllers/v1/${fileName}Controller.ts`, 
`import { Context } from 'koa';
import { ICustomAppContext } from './../../typings';
import { ${className} } from './../../models/core';
import { BaseBreadController } from '../baseBreadController';
import { ${className}Transformer } from './../../transformers';
import { ${className}Service } from './../../services/dbService';
import { ValidationService } from './../../services';

type CustomContext = Context & ICustomAppContext;

export class ${className}Controller extends BaseBreadController {
  constructor() {
    super(
    new ${className}Transformer(),
    new ${className}Service,
    new ValidationService(${className}));

    this.hasBrowse = true;
    this.hasRead = true;
    this.hasEdit = true;
    this.hasAdd = true;
    this.hasDelete = true;
  }
}
`,  {recursive: true}
)
