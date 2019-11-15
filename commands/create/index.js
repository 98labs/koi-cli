const { renameSync, writeFile } = require('fs');
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

   return exec('git clone --branch '+ branch + ' ' + repositoryPath, (error) => {
        if(error !== 0) process.exit()
        else {
            removeGit()
            renameDir()
            createEnvFile()
        }
    })
}

function createEnvFile() {
    return writeFile(process.cwd() + '/' + answers.projectName + '/.env', env, 
    (error) => error )
}

function renameDir() {
    return renameSync(process.cwd() + '/koi' , process.cwd() + '/' + answers.projectName);
}

function installModules() {
    return exec('cd ' + process.cwd() + '/' + answers.projectName + '&& npm install',
    (error) => { error !== 0 ? process.exit() : console.log('success!') })
}

function removeGit() {
    return writeFile(process.cwd() + '/' + answers.projectName + '/package.json', package, 
    (error) => error !== null ? process.exit(): installModules())
}
 
run();
