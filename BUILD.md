# Opencage Geosearch javascript client library developer documentation

As ususal, please clone the repo first.

We use [lerna](https://lerna.js.org/) in addition to [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)

The prerequisites are :

- [node](https://nodejs.org/en/download/) 14 or higher
- [yarn](https://yarnpkg.com/)
- An [OpenCage geosearch](https://opencagedata.com/geosearch) key

We would recommand to install globally `serve`. To serve the examples

```bash
yarn global add serve
# or
npm i -g serve
```

## Getting started

To setup the environnement, once:

```bash
# install the dependencies
yarn
```

Link the packages to develop and directly see the changes accross the packages and examples:

```bash
yarn bootstrap
```

Create `.env` file containing your personal Key

```bash
yarn dotenv <YOUR-GEOSEARCH-KEY>
```

this will create a .env file in :

- [packages/geosearch-core](./packages/geosearch-core)
- [examples/react-example](./examples/react-example)

Create the symbolic links

```bash
yarn symlinks
```

This will create symbolic links, so the examples can use the local built version of the packages.

## Build and watch

to build the packages run the command

```bash
yarn build
```

to run a continuous build, use the command

```bash
yarn watch
```

## Playground

The playground is the [React example](./examples/react-example) which allow to check the built [core](./packages/geosearch-core) package.

Start the playground with the commmand

```bash
yarn playground:start
```

## Others examples

So far two others examples are provided

### simple example

It uses the bundle version of the package for an effortless integration in your website.

```bash
serve examples/simple-example
```

### Advanced example

it uses the core version of the package and demonstrates the different options on the geosearch

```bash
serve examples/advanced-example
```

## linter

We use the airbnb config with eslint

```bash
yarn lint
```

## unit tests

```bash
yarn test
```

## coverage

```bash
yarn test:coverage
```

the open your browser with `open ./packages/geosearch-core/coverage/index.html`

## Clean build packages

run the command

```bash
yarn build:clean
```

## Remove node_modules folders

```bash
yarn clean
```

## Publish to npmjs.com

```bash
npm login
yarn build
lerna publish --no-private

```

## Audit

Sometimes `yarn audit` fails. An alternative is

```bash
yarn audit --groups "dependencies"
```
