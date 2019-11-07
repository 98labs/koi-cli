# Koi-cli (KOA Typescript API - Command Line Interface)

### A simple CLI made to generate base files and migration files.
 -----------------------------------------------------------------
## Prerequisite: 
Clone the Koi project here: 
 - https://code.98labs.com/boilerplates/koa-typescript-api-v2.git
 -----------------------------------------------------------------
## Install:
```bash
npm i koi-cli
npm i -g koi-cli
```
 -----------------------------------------------------------------
## Usage:
#### 1. Run to generate migration file for sequelize to use.
```bash
   koi-generate:migration $fileName
     example: koi-generate:migration user
```
#### 2. Modify the migration file that just have been created.
- Migrations:
```bash
# /src/db/migrations/create-migration-user.js
# Sample migration only

 "use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const DataTypes = Sequelize;

    return queryInterface.createSchema("core")
    .then(() => {
      const tableConfig = {
        schema: "public",
        tableName: "user"
      };

      const tableProps = {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      };

      return queryInterface.createTable(tableConfig, tableProps);
    });
  },

  down: (queryInterface, Sequelize) => {
    const tableConfig = {
      schema: "public",
      tableName: "user"
    };

    return queryInterface.dropTable(tableConfig).then(() => {
      return queryInterface.dropTable(tableConfig);
    });
  }
};
```
#### 3. Run to generate base files (models, controllers, routes, transformers and services).
```bash
   koi-generate:base $fileName
     example: koi-generate:base user 
```
#### 4. Modify the recently created base files.
- Models: 
```bash
# /src/models/user.ts
# Sample model only

import {
  DataTypes,
  ModelAttributes,
} from 'sequelize';

import { BaseModel, ITableConfig } from '../baseModel';

export interface IUser {
  id?: number;
  name: string;
  password: string;
}

export class User extends BaseModel implements IUser {
  public id: number;
  public name: string;
  public password: string;

  static getAttributes(): ModelAttributes {
    return {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    };
  }

  public static getValidationRules(): any {
    # Guide for validation Rules https://validatejs.org
    return {};
  }

  static getTableNameConfig(): ITableConfig {
    return {
      schema: 'public',
      tableName: 'users',
    };
  }

  public static initAssociations(): void {
    # Define your model association here
  }
}

```

- Controllers:
```bash
# /src/controllers/v1/userController.ts
# Sample controller only

import { Context } from 'koa';
import { ICustomAppContext } from './../../typings';
import { User } from './../../models/core';
import { BaseBreadController } from '../baseBreadController';
import { UserTransformer } from './../../transformers';
import { UserService } from './../../services/dbService';
import { ValidationService } from './../../services';

# type alias for shortcut to trigger intellisense
type CustomContext = Context & ICustomAppContext;

export class UserController extends BaseBreadController {

  constructor() {
    super(
    new UserTransformer(),
    new UserService,
    new ValidationService(User)
    );

    # set any of these variables to false as needed

    this.hasBrowse = false;
    this.hasRead = true;
    this.hasEdit = true;
    this.hasAdd = true;
    this.hasDelete = true;
  }
}
```

- Routes:
```bash
# /src/routes/v1/user.ts
# Sample route only

import * as Router from 'koa-router';
import { UserController } from '../../controllers/v1';

const route = new Router({ prefix: '/user' });
const userCtrl = new UserController();

route.get('/', userCtrl.browse);
route.get('/:id', userCtrl.read);
route.patch('/:id', userCtrl.edit);
route.post('/', userCtrl.add);
route.delete('/:id', userCtrl.delete);

export { route as userRoute };

```

- Transformers: 
```bash
# /src/transformers/userTransformer.ts
# Sample transformer only

import { TransformableObjectAbstract } from './transformableObjectAbstract';

export class UserTransformer extends TransformableObjectAbstract {

  protected objectType = 'user';
  protected visibleFields = [
    'username',
    'firstName',
    'middleName',
    'lastName',
    'phone',
    'mobile',
  ];

}

```
 -----------------------------------------------------------------

## License:
- MIT
- Copyright 2019 © 98Labs, Inc```
 -----------------------------------------------------------------