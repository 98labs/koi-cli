const { renameSync, writeFileSync } = require('fs');
const { exec } = require('shelljs')
const { package } = require('./package')
const { prompt } = require('inquirer');
const header = require('../../lib/header')
const questions = require('./questions')
const env = require('./env')

let answers = {
    projectName: process.argv[3],
    version: 'v2',
    response: 'OpenAPI V3'
}

let branch = 'master'
let repositoryPath = 'https://github.com/98labs/koi.git'

async function run() {
   header()

   if(!process.argv[3]) {
        answers = await prompt(questions)
        branch = answers.version === 'v2' ? 'master' : 'master'
   }

   if(process.argv[4]) {
       if (process.argv[4].charAt(0) !== '@') {
           console.log(`koi create ${process.argv[3]} \x1b[31m${process.argv[4]}`)
           process.exit()
       }else {
           branch = process.argv[4].substr(1)
       }
   }

   return exec('git clone --branch '+ branch + ' ' + repositoryPath, async (error) => {
        if(error !== 0) process.exit();
        else {
            await renameDir()
            await fixedPackageJson()
            await removeGit()
            await installModules()
            await createEnvFile()
        }
    })
}

async function createEnvFile() {
    return writeFileSync(process.cwd() + '/' + answers.projectName + '/.env', env, 
    (error) =>  errorHandler(error))
}

async function renameDir() {
    return renameSync(process.cwd() + '/koi' , process.cwd() + '/' + answers.projectName,
    (error) =>  errorHandler(error));
}

async function installModules() {
    return exec('cd ' + process.cwd() + '/' + answers.projectName + '&& npm install',
    (error) =>  errorHandler(error))
}

async function fixedPackageJson() {
    return writeFileSync(process.cwd() + '/' + answers.projectName + '/package.json', package, 
    (error) =>  errorHandler(error))
}

async function removeGit() {
    return exec('cd ' + process.cwd() + '/' + answers.projectName + '&& rm -rf .git', 
    (error) =>  errorHandler(error))
}

function errorHandler(error) {
    if(error) process.exit()
}
 
run();
