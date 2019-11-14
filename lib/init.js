const reqCommand = process.argv[2]

const standardCommands = require('../commands')

if (reqCommand in standardCommands) require(standardCommands[reqCommand])
else {
    console.log('invalid command')
    process.exit()
}