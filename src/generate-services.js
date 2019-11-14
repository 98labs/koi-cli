#!/usr/bin/env node

const fs = require('fs');
const fileName = process.argv[2];
const className = process.argv[2].charAt(0).toUpperCase() + process.argv[2].slice(1);
const currentDir = process.cwd()

fs.mkdirSync(`${currentDir}/src/services/dbService`, {recursive: true})
fs.mkdirSync(`${currentDir}/src/services/authService`, {recursive: true})

fs.writeFileSync(`${currentDir}/src/services/dbService/${fileName}Service.ts`, 
`import { BaseDbService } from './baseDbService';
import { ${className} } from './../../models/core';

export class ${className}Service extends BaseDbService {

  protected _primaryKeyAttribute = 'id';
  protected _defaultSearchField = 'id';

  constructor() {
    super(${className});
  }
}
`,  {recursive: true}
)
