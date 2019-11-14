#!/usr/bin/env node

const fs = require('fs')
const tableName = process.argv[2];
const currentDir = process.cwd()

fs.mkdirSync(`${currentDir}/src/db/config`, {recursive: true});

fs.writeFileSync(`${currentDir}/src/db/config/${tableName}.json`,
`{
    "schema": "", 
    "table": {
        "tableName": "${tableName}",
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
