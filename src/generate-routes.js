const fs = require('fs');
const fileName = process.argv[2];
const className = process.argv[2].charAt(0).toUpperCase() + process.argv[2].slice(1);

fs.writeFileSync(`${__dirname}/../../../src/routes/v1/${fileName}.ts`, 
`import * as Router from 'koa-router';
import { BaseContext } from 'koa';
import { ${className}Controller } from '../../controllers/v1';
import { authService } from './../../services';
const jwtMiddleware = authService.verifyTokenMiddleware();

const route = new Router({ prefix: '/${fileName}' });
const ${fileName}Ctrl = new ${className}Controller();

// Include 'jwtMiddleware' for JWT Authentication
route.get('/', jwtMiddleware, ${fileName}Ctrl.browse);
route.get('/:id', ${fileName}Ctrl.read);
route.patch('/:id', ${fileName}Ctrl.edit);
route.post('/', ${fileName}Ctrl.add);
route.delete('/:id', ${fileName}Ctrl.delete);

export { route as ${fileName}Route };
`,  {recursive: true}
)
