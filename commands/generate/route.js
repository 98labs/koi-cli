const { writeFileSync, readFileSync } = require('fs');

let dir = process.argv[4].split('/')
const fileName = dir[dir.length - 1];
dir = dir.filter(e => e !== fileName);
dir = dir.join('/')
dir = dir ? dir : 'core'

const className = fileName.charAt(0).toUpperCase() + fileName.slice(1);


const value = 
`import * as Router from 'koa-router';
import { BaseContext } from 'koa';
import { ${className}Controller } from '../../controllers/v1';
// import { authService } from './../../services';
// const jwtMiddleware = authService.verifyTokenMiddleware();

const route = new Router({ prefix: '/${fileName}' });
const ${fileName}Ctrl = new ${className}Controller();

// Include 'jwtMiddleware' for JWT Authentication
route.get('/', ${fileName}Ctrl.browse);
route.get('/:id', ${fileName}Ctrl.read);
route.patch('/:id', ${fileName}Ctrl.edit);
route.post('/', ${fileName}Ctrl.add);
route.delete('/:id', ${fileName}Ctrl.delete);

export { route as ${fileName}Route };
`


function updateIndex() {
    const currentDir = process.cwd();
    let data = readFileSync(currentDir + '/src/routes/v1/index.ts')
    data = data.toString()

    if (!data.includes(fileName)) {
        data = data.replace('// routes', `// routes\nimport { ${fileName}Route } from './${fileName}';`)
        data = data.replace(`const nestedRoutes: Router[] = [`, `const nestedRoutes: Router[] = [\n  ${fileName}Route,`)
    }
    
    return writeFileSync(
        process.cwd() + `/src/routes/v1/index.ts`, 
        data, 
        {recursive: true}
    );
}

function write() {
    return writeFileSync(
        process.cwd() + `/src/routes/v1/${fileName}.ts`, 
        value, 
        {recursive: true}
    );
}

function run() {
    write()
    updateIndex()
}

run()