# web

This template should help get you started developing with Vue 3 in Vite.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Develop and Debug

1. console only in development mode
   - Use `devConsole` from [Helpers](src/libs/helpers.ts#L14) to log in console.
   ```typescript
   devConsole.log(...data: any[])
   devConsole.error(...data: any[])
   devConsole.warn(...data: any[])
   devConsole.info(...data: any[])
   devConsole.debug(...data: any[])
   devConsole.table(...data: any[])
   ```

### Libraries

1. [Axios](src/libs/axios.ts)
   - Use to call API
   - Import `defaultRequest` and `useErrorHandler` from [Axios](src/libs/axios.ts) to `src/APIs/*.ts`
   - Use `defaultRequest` to call API
   - Use `useErrorHandler` to handle error
2. [Helpers](src/libs/helpers.ts)
   - Use to create helper functions
   - Import `* as helpers` from [Helpers](src/libs/helpers.ts) to use, e.g. `helpers.dataConverter(data, {...})`
3. [Cookie](src/libs/cookie.ts)
   - Use to manage cookies
   - There are 4 functions: `getCookie`, `setCookie`, `deleteCookie` and `clearAllCookies`

### Components

1. [IconSprite](src/components/IconSprite.vue): SVG sprite icon component.

### API

1. Add your API to `src/APIs/*.ts`
2. Export your API from [APIs](src/APIs/index.ts)
3. Import the `APIs` object using `import * as APIs from "@/src/APIs"`.
4. Use `APIs` object to call your API by `APIs.yourAPI.yourFunction()`
