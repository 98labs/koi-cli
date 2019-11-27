const package = 
`{
    "name": "${process.argv[3]}",
    "version": "1.0.0",
    "main": "dist/server.js",
    "scripts": {
      "start-dev": "nodemon --watch 'src/**/*' -e ts,tsx --exec ts-node src/server.ts",
      "build-ts": "tsc",
      "copy-static-assets": "ts-node copyStaticAssets.ts",
      "tslint": "tslint -c tslint.json -p tsconfig.json",
      "serve": "node dist/server.js",
      "build": "npm run tslint && npm run build-ts",
      "start": "npm run build && npm run serve"
    },
    "license": "MIT",
    "devDependencies": {
      "@types/chai": "^4.1.7",
      "@types/dotenv": "^4.0.3",
      "@types/koa": "2.0.48",
      "@types/koa-bodyparser": "^4.2.0",
      "@types/koa-helmet": "^3.1.2",
      "@types/koa-router": "^7.0.28",
      "@types/koa__cors": "^2.2.2",
      "@types/mocha": "^5.2.6",
      "@types/node": "^10.7.0",
      "@types/shelljs": "^0.8.0",
      "chai": "^4.2.0",
      "mocha": "^6.1.4",
      "nodemon": "^1.17.4",
      "shelljs": "^0.8.2",
      "ts-node": "^7.0.1",
      "tslint": "^5.14.0",
      "tslint-config-airbnb": "^5.11.1",
      "typescript": "^3.0.1"
    },
    "dependencies": {
      "@koa/cors": "^2.2.1",
      "@types/bcrypt": "^3.0.0",
      "bcrypt": "^3.0.5",
      "class-validator": "^0.9.1",
      "custom-env": "^1.0.2",
      "dotenv": "^6.0.0",
      "jsonapi-serializer": "^3.6.5",
      "koa": "^2.7.0",
      "koa-bodyparser": "^4.2.1",
      "koa-helmet": "^4.0.0",
      "koa-jwt": "^3.3.2",
      "koa-router": "^7.4.0",
      "pg": "^7.9.0",
      "pg-hstore": "^2.3.2",
      "sequelize": "^6.0.0",
      "sequelize-cli": "^5.5.0",
      "validate.js": "^0.13.1",
      "winston": "^3.2.1",
      "winston-daily-rotate-file": "^3.8.0"
    }
  }
  `

  module.exports = {
      package
  };