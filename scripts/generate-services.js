const fs = require('fs');
const fileName = process.argv[2];
const className = process.argv[2].charAt(0).toUpperCase() + process.argv[2].slice(1);

fs.writeFileSync(`${__dirname}/../../../src/services/dbService/${fileName}Service.ts`, 
`import { BaseDbService } from './baseDbService';
import { ${className} } from './../../models/core';

export class ${className}Service extends BaseDbService {

  protected _primaryKeyAttribute = 'id';
  protected _defaultSearchField = 'id';

  constructor() {
    super(${className});
  }
}
`
)
