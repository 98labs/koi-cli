const { writeFileSync, appendFileSync, readdirSync, readFileSync } = require('fs');
const pluralize = require('pluralize')

let dir = process.argv[4].split('/')
const fileName = dir[dir.length - 1];
dir = dir.filter(e => e !== fileName);
dir = dir.join('/')
dir = dir ? dir : 'core'

const className = fileName.charAt(0).toUpperCase() + fileName.slice(1);

// const regexFile = new RegExp(fileName)

// const files = readdirSync(process.cwd() + `/src/db/migrations`,`utf-8`, (err, buff) => {
//   if (err) {
//     console.error(err)
//     return err;
//   } else {
//     return buff;
//   }
// });

// const filteredFilename = files.filter((file) => {   
//     return file.match(regexFile);
// });

// const readFile = readFileSync(process.cwd() + `/src/db/migrations/${filteredFilename[0]}`, 'utf-8', (err, buff) => {
//     if (err) {
//       console.error(err)
//       return err;
//     } else {
//       return buff;
//     }
//   });

// const trimmedContent = readFile.split('tableProps = {')[1].split('};')[0]


const value = 
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
    return {};
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
      // Write table name here
      schema: '${dir}',
      tableName: '${pluralize(fileName)}',
    };
  }

  public static initAssociations(): void {
  }
}
`

function updateIndex() {
    return appendFileSync(
        process.cwd() + `/src/models/${dir}/index.ts`,
         `export * from './${fileName}';\r\n`
    );
}

function write() {
    return writeFileSync(
        process.cwd() + `/src/models/${dir}/${fileName}.ts`, 
        value, 
        {recursive: true}
    );
}

function run() {
    write()
    updateIndex()
}

run()