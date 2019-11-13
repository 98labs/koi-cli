const fs = require('fs');
const fileName = process.argv[2];
const className = process.argv[2].charAt(0).toUpperCase() + process.argv[2].slice(1);

fs.writeFileSync(`${__dirname}/../../../src/transformers/${fileName}Transformer.ts`, 
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
`,  {recursive: true}
)
