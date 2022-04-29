
# Base NestJS API

This project is a skeleton for a generic NestJS API with an user table, 
authentication and role based authorization, and was created to be used as a startup for backend projects.


## Features

- User creation
- Authentication (with username/password)
- User listing with role based authorization

There are some decorators that can be used on new endpoints, like **UseGuards** for endpoints that needs authentication, and the **Roles** that can be used in conjunction with **UseGuards** to implement role based authorization 


## Libraries

**Authentication:** @nestjs/jwt, @nestjs/passport, passport, passport-jwt, passport-local

**Encryption:** bcrypt

**ORM:** Prisma

**Utilities:** class-transformers, class-validator


## Installation

After cloning the repo, enter his folder using:

```bash
  cd base-nestjs-api
```

Install the dependencies using

```bash
  npm install
  
  yarn install
```

Setup the **.env** file at the root folder. It should be something similar to this:

```
DATABASE_URL="postgresql://postgres:root@localhost:5432/database?schema=public"
SALT_ROUNDS=10
JWT_SECRET=12345678910
JWT_EXPIRE=3600s
```

Apply the migration to the database by running the **migrate:deploy** script:

```
npm run migrate:deploy

yarn migrate:deploy
```

Now you can run the application by executing:

```
npm run dev

yarn dev
```

And the application will be running on your **3000** port.


## API Documentation

#### Create an user

```http
  POST /users
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Mandatory**. The user's email used to sign in |
| `password` | `string` | **Mandatory**. The user's password |
| `firstName` | `string` | **Mandatory**. The user's first name |
| `lastName` | `string` | **Mandatory**. The user's last name |

#### Authenticate with email and password

```http
  POST /authenticate/password
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email` | `string` | **Mandatory**. The user's email |
| `password` | `string` | **Mandatory**. The user's password |

#### List all the users (only for admin users)

```http
  GET /users
```


## Autores

- [@thiscosta](https://www.github.com/thiscosta)

