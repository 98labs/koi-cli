const generateCommands = {
    'controller' : './controller',
    'service' : './service',
    'route' : './route',
}

const reqCommand = process.argv[3]

if (reqCommand in generateCommands) require(generateCommands[reqCommand])
else {
    console.log('invalid command')
    process.exit()
}