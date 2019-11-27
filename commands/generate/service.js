const { writeFileSync, appendFileSync } = require('fs');

let dir = process.argv[4].split('/')
const fileName = dir[dir.length - 1];
dir = dir.filter(e => e !== fileName);
dir = dir.join('/')
dir = dir ? dir : 'core'

const className = fileName.charAt(0).toUpperCase() + fileName.slice(1);

const value = 
`import { BaseDbService } from './baseDbService';
import { ${className} } from './../../models/${dir}';

export class ${className}Service extends BaseDbService {

  protected _primaryKeyAttribute = 'id';
  protected _defaultSearchField = 'id';

  constructor() {
    super(${className});
  }
}
`

function updateIndex() {
    return appendFileSync(
        process.cwd() + `/src/services/dbService/index.ts`,
         `export * from './${fileName}Service';\r\n`
    );
}

function write() {
    return writeFileSync(
        process.cwd() + `/src/services/dbService/${fileName}Service.ts`, 
        value, 
        {recursive: true}
    );
}

function run() {
    write()
    updateIndex()
}

run()