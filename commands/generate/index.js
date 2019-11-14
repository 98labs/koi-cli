const generateCommands = {
    'controller' : './controller',
    'service' : './service',
    'route' : './route',
    'model' : './model',
    'transformer' : './transformer',
    'all' : './all'
}

const reqCommand = process.argv[3]

if (reqCommand in generateCommands) require(generateCommands[reqCommand])
else {
    console.log('invalid command')
    process.exit()
}