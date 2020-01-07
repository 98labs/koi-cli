const { readdirSync } = require('fs');

const generateCommands = {
    'controller' : './controller',
    'service' : './service',
    'route' : './route',
    'model' : './model',
    'transformer' : './transformer',
    'all' : './all'
}

const reqCommand = process.argv[3]

function isKoiProject() {
    const files = readdirSync(process.cwd())
    const isExisting = files.find((file) => {
        return file === 'koi.json'
    })    
    if (isExisting) return true
    return false
}

if (!isKoiProject()) {    
    console.error('Not a koi project')
    process.exit()
}

if (reqCommand in generateCommands)
require(generateCommands[reqCommand])
else {
    console.error('Invalid command')
    process.exit()
}

