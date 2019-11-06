const fs = require('fs');
const shelljs = require('shelljs');
const fileName = process.argv[2];

fs.appendFileSync(`${__dirname}/../../../src/controllers/v1/index.ts`,`export * from './${fileName}Controller';\r\n`);
fs.appendFileSync(`${__dirname}/../../../src/models/core/index.ts`,`export * from './${fileName}';\r\n`);
fs.appendFileSync(`${__dirname}/../../../src/services/dbService/index.ts`,`export * from './${fileName}Service';\r\n`);
fs.appendFileSync(`${__dirname}/../../../src/transformers/index.ts`,`export * from './${fileName}Transformer';\r\n`);

shelljs.exec(`
sed -i '2 i import { '${fileName}'Route } from \'"'"'.\/'${fileName}'\'"'"';' ${__dirname}/../../../src/routes/v1/index.ts  << EOF
EOF `)

shelljs.exec(`
sed -i '/const nestedRoutes/ a '${fileName}'Route,' ${__dirname}/../../../src/routes/v1/index.ts << EOF
EOF
`)
