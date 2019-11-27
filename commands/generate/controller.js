const { writeFileSync, appendFileSync } = require('fs');

let dir = process.argv[4].split('/')
const fileName = dir[dir.length - 1];
dir = dir.filter(e => e !== fileName);
dir = dir.join('/')
dir = dir ? dir : 'core'

const className = fileName.charAt(0).toUpperCase() + fileName.slice(1);

const value = 
`import { Context } from 'koa';
import { ICustomAppContext } from './../../typings';
import { ${className} } from './../../models/${dir}';
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
`

function updateIndex() {
    return appendFileSync(
        process.cwd() + `/src/controllers/v1/index.ts`,
         `export * from './${fileName}Controller';\r\n`
    );
}

function write() {
    return writeFileSync(
        process.cwd() + `/src/controllers/v1/${fileName}Controller.ts`, 
        value, 
        {recursive: true}
    );
}

function run() {
    write()
    updateIndex()
}

run()