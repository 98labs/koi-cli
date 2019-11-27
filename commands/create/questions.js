questions = [
    {
        type: 'input',
        name: 'projectName',
        message: "Project name:",
        validate: function(value) {
            const pass = value.match("^[a-zA-Z_-]*$")
            if (pass) return true
            return 'Please Enter a valid project name'
        }
    },
    {
        type: 'list',
        name: 'version',
        message: 'Which version of the boilerplate?',
        choices: ['v1', 'v2'],
    },
    {
        type: 'list',
        name: 'response',
        message: 'Standard Response',
        choices: ['OpenAPI V3', 'Json Api Standard'],
    }
]

module.exports = questions;