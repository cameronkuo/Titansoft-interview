# server

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm start
```

## Project Structure

- [src](src)
  - [app.ts](src/app.ts) - Entry point of the application.
  - [controllers](src/controllers) - Contains all the controllers for the application.
  - [middlewares](src/middlewares) - Contains all the middlewares for the application.
  - [APIs](src/APIs) - Contains all the routes for the application to handle requests.
  - [schemas](src/schemas) - Contains all the schemas for the application to validate requests.
  - [types](src/types) - Contains all the types for the application.
- [logs](logs) - Contains all the log files for the application.
- [public](public) - Contains all the static files for the application.
- [nodemon.json](nodemon.json) - [Nodemon](https://nodemon.io/) configuration file.

### Middlewares

1. [logger](src/middlewares/logger.ts)

   - Logs the request method and URL to the console.
   - Create records in [access.log](logs/access.log) file if error occurs.
   - Automatically rotates the log file when size exceeds 300KB.

2. [errorHandler](src/middlewares/errorHandler.ts)

   - Logs the error to the console.
   - Sends the error message to the client.

3. [joi-validator](src/middlewares/joi-validator.ts)

   - Validates the request body using [Joi](https://joi.dev/).
   - Sends the error message to the client if validation fails.

### ESLint

1. [eslint-import-plugin](https://github.com/import-js/eslint-plugin-import) - ESLint plugin with rules that help validate proper imports.

### Endpoints

1. `/api/v1/auth/verify`: Verify code received from client. Return token if code is correct.
2. `/api/v1/auth`: Get user info with `Authorization` header, which get from `/api/v1/auth/verify`.
