#!/usr/bin/env node

const fs = require('fs');
const shelljs = require('shelljs');
const fileName = process.argv[2];
const currentDir = process.cwd()

fs.appendFileSync(`${currentDir}/src/controllers/v1/index.ts`,`export * from './${fileName}Controller';\r\n`);
fs.appendFileSync(`${currentDir}/src/models/core/index.ts`,`export * from './${fileName}';\r\n`);
fs.appendFileSync(`${currentDir}/src/services/dbService/index.ts`,`export * from './${fileName}Service';\r\n`);
fs.appendFileSync(`${currentDir}/src/transformers/index.ts`,`export * from './${fileName}Transformer';\r\n`);

shelljs.exec(`
sed -i '2 i import { '${fileName}'Route } from \'"'"'.\/'${fileName}'\'"'"';' ${currentDir}/src/routes/v1/index.ts  << EOF
EOF `)

shelljs.exec(`
sed -i '/const nestedRoutes/ a '${fileName}'Route,' ${currentDir}/src/routes/v1/index.ts << EOF
EOF
`)
