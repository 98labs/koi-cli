#!/usr/bin/env node

const fs = require('fs')

fs.mkdirSync(`${__dirname}/../../../src/db`, {recursive: true});
fs.mkdirSync(`${__dirname}/../../../src/db/seeders`, {recursive: true});
fs.mkdirSync(`${__dirname}/../../../src/db/migrations`, {recursive: true});
fs.mkdirSync(`${__dirname}/../../../src/models`, {recursive: true});

const migrationFiles = fs.readdirSync(`${__dirname}/../../../src/db/config`, `utf-8`)

const tableProps = migrationFiles.map((jsonFile) => {
 return fs.readFileSync(`${__dirname}/../../../src/db/config/${jsonFile}`, `utf-8`, (err, buff) => {
    if (err) {
      console.log(err)
      return err;
    } else {
      return buff;
    }
  })
})

tableProps.forEach((tableProp) => {
  const properties = JSON.parse(tableProp)

  const tablePropArray = [];
for (props in properties.table.attributes) {
  const dataType = `DataTypes.${properties.table.attributes[props].dataType.toUpperCase()}`
  delete properties.table.attributes[props].dataType      
  tablePropArray.push(
          `${[props]}: {
            type: ${dataType},
            ${JSON.stringify(properties.table.attributes[props]).replace(/["" {}]+/g, '').replace(/[,]+/g, `,
            `)}
          }
    `)            
}

fs.writeFileSync(`${__dirname}/../../../src/db/migrations/create-migration-${properties.table.tableName}.js`,
  `const tableConfig = {
    schema: '${properties.table.schema || 'public'}',
    tableName: '${properties.table.tableName}'
  };
  
  module.exports = {
    up: (queryInterface, Sequelize) => {
      const DataTypes = Sequelize;
        const tableProps = {
          ${tablePropArray}
        }
        return queryInterface.transaction((t) => { 
          return queryInterface.createTable(tableConfig, tableProps, 
            {transaction: t});
        })
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.transaction((t) => { 
        return queryInterface.dropTable(tableConfig,
        {transaction: t});
      })
  }
};
  `, {recursive: true})  
  console.log(`Success: create-migration-${properties.table.tableName}.js`);    
})




