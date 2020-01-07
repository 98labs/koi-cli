module.exports = {
    async koiIdentifier(answers, branch, repositoryPath) {
return `{
    "project-name": "${answers.projectName}",
    "branch": "${branch}",
    "repository": "${repositoryPath}",
    "response": "${answers.response}",
    "version": "${answers.version}"
}`
    }   
}
