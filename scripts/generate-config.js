#!/usr/bin/env node

const fs = require('fs')
const tableName = process.argv[2];

fs.mkdirSync(`${__dirname}/../../../src/db/config`, {recursive: true});

fs.writeFileSync(`${__dirname}/../../../src/db/config/${tableName}.json`,
`{
    "schema": "", 
    "table": {
        "tableName": "${tableName || 'public'}",
        "attributes" :{
            "id": {
                "require": true,
                "dataType": "integer"
            },
        }
    }
}
`
)

console.log(`Success: ${tableName}.json`); 

