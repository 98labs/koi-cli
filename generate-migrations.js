#!/usr/bin/env node

const fs = require('fs');
const fileName = process.argv[2];

fs.mkdirSync('./src/db', {recursive: true})
fs.mkdirSync('./src/db/seeders', {recursive: true})
fs.mkdirSync('./src/db/migrations', {recursive: true})
fs.mkdirSync('./src/models', {recursive: true})

fs.writeFileSync(`./src/db/migrations/create-migration-${fileName}.js`, 
`
const tableConfig = {
  schema: '',
  tableName: ''
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    const DataTypes = Sequelize;
      const tableProps = {
      // Write migration code here.
      };
      return queryInterface.sequelize.transaction((t) => { 
        return queryInterface.createTable(tableConfig, tableProps, 
          {transaction: t});
      })
  },
  down: (queryInterface, Sequelize) => {
    // If migration fails, this will be called. Rollback your migration changes.
    }
};
`
)

console.log(`Success: create-migration-${fileName}.js`);


