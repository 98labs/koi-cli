const { renameSync, writeFile } = require('fs');
const { exec } = require('shelljs')
const { package } = require('./package')


let repositoryPath = 'https://github.com/98labs/koi.git'

function run() {
   return exec('git clone ' + repositoryPath, (error) => {
        if(error !== 0) process.exit()
        else {
            renameDir()
            rewritePackageJson()
        }
    })
}

function renameDir() {
    return renameSync(process.cwd() + '/koi' , process.cwd() + '/' + process.argv[3]);
}

function installModules() {
    return exec('cd ' + process.cwd() + '/' + process.argv[3] + '&& npm install',
    (error) => { error !== 0 ? process.exit() : console.log('success!') })
}

function rewritePackageJson() {
    return writeFile(process.cwd() + '/' + process.argv[3] + '/package.json', package, 
    (error) => error !== null ? process.exit(): installModules())
}
 
run();