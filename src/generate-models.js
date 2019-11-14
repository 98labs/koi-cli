#!/usr/bin/env node

const fs = require('fs');
const fileName = process.argv[2];
const className = process.argv[2].charAt(0).toUpperCase() + process.argv[2].slice(1);
const currentDir = process.cwd()
fs.mkdirSync(`${currentDir}/src/models/core`, {recursive: true});

const regexFile = new RegExp(fileName)
const files = fs.readdirSync(`${currentDir}/src/db/migrations`,`utf-8`, (err, buff) => {
    if (err) {
        console.error(err)
        return err;
    } else {
        return buff;
    }
});

const filteredFilename = files.filter((file) => {   
    return file.match(regexFile);
});

const readFile = fs.readFileSync(`${currentDir}/src/db/migrations/${filteredFilename[0]}`, 'utf-8', (err, buff) => {
  if (err) {
    console.error(err)
    return err;
  } else {
    return buff;
  }
});
const trimmedContent = readFile.split('tableProps = {')[1].split('};')[0]

fs.writeFileSync(`${currentDir}/src/models/core/${fileName}.ts`, 
`import {
    Model,
    DataTypes,
    BuildOptions,
    ModelAttributes,
    HasOneGetAssociationMixin,
  } from 'sequelize';

import { BaseModel, ITableConfig } from '../baseModel';

export interface I${className} {
  id?: number;
}

export class ${className} extends BaseModel implements I${className} {
  public id?: number;

  static getAttributes(): ModelAttributes {
    return {${trimmedContent || undefined}};
  }

  public static getValidationRules(): any {
    return {
      id: {
        numericality: {
          onlyInteger: true,
          greaterThan: 0,
        },
      },
    };
  }

  static getTableNameConfig(): ITableConfig {
    return {
      schema: '',
      // Write table name here
      tableName: '',
    };
  }

  public static initAssociations(): void {
  }
}
`,  {recursive: true}
)
