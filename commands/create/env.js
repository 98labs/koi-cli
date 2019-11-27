const value = 
`NODE_ENV=local
ENV=local
PORT=3000

LOG_LEVEL=debug
LOG_DIRECTORY=./logs

DB_HOST=localhost
DB_PORT=5432
DB_USER=boilerplate
DB_PASS=boilerplate
DB_DATABASE_NAME=boilerplate
DB_DIALECT=postgres

JWT_SECRET=d2FrZSBtZSB1cCB3aGVuIHNlcHRlbWJlciBlbmRzc

# follow the following format https://github.com/zeit/ms.js
JWT_VALIDITY=2h
`

module.exports = value