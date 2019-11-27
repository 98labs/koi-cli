const requestCommand = process.argv[2]

const standardCommands = require('../commands')

if (requestCommand in standardCommands) require(standardCommands[requestCommand])
else {
    console.log('invalid command')
    process.exit()
}