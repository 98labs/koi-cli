const { writeFileSync, appendFileSync } = require('fs');

let dir = process.argv[4].split('/')
const fileName = dir[dir.length - 1];
dir = dir.filter(e => e !== fileName);
dir = dir.join('/')
dir = dir ? dir : 'core'

const className = fileName.charAt(0).toUpperCase() + fileName.slice(1);

const value = 
`import { TransformableObjectAbstract } from './transformableObjectAbstract';

export class ${className}Transformer extends TransformableObjectAbstract {

  protected objectType = '${fileName}';
  // Write the properties you only want to display

  protected visibleFields = [
    'username',
    'firstName',
    'middleName',
    'lastName',
    'phone',
    'mobile',
  ];
}
`

function updateIndex() {
    return appendFileSync(
        process.cwd() + `/src/transformers/index.ts`,
         `export * from './${fileName}Transformer';\r\n`
    );
}

function write() {
    return writeFileSync(
        process.cwd() + `/src/transformers/${fileName}Transformer.ts`, 
        value, 
        {recursive: true}
    );
}

function run() {
    write()
    updateIndex()
}

run()