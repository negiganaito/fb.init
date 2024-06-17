## Getting Started

Run Locally

-   `pnpm dev` - server started at [localhost:3000](https://localhost:3000/) in local mode
-   `pnpm start` - server started at [localhost:3000](https://localhost:3000/) in development mode
-   `pnpm watch` - server started at [localhost:3000](https://localhost:3000/) in production mode

Build Project

-   `pnpm clean` - clean the `build/` directory
-   `pnpm build` - we can see the output in `build/` directory

Run Unit Tests

-   `pnpm test` - run all test cases
-   `pnpm test:watch` - run all test cases in watch mode
-   `pnpm test:coverage` - run all test cases and collect coverage for each tested files

Analyze

-   `pnpm analyze` - build project to `/build` and analyze your bundle size in [localhost:3006](http://localhost:3006)

Codebase

-   `pnpm lint` - lint the codebase
-   `pnpm format` - format the codebase using prettier

### Tools and Technologies

-   [ReactJS](https://reactjs.org/)
-   [React Router](https://reactrouter.com/en/main/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Webpack](https://webpack.js.org/)
-   [Styled Components](https://styled-components.com/)
-   [i18next](https://react.i18next.com/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Commits

-   We use the [conventional commit lint](https://commitlint.js.org/#/) for linting our commit messages
-   Also before every commit we run the `lint` command using [husky](https://typicode.github.io/husky/#/) for lint our
    codebase

---
