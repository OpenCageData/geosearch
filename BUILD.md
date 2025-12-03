# Opencage Geosearch javascript client library developer documentation

As ususal, please clone the repo first.

We use [lerna](https://lerna.js.org/) in addition to [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)

The prerequisites are :

- [node](https://nodejs.org/en/download/) 22 or higher
- [yarn](https://yarnpkg.com/)
- An [OpenCage geosearch](https://opencagedata.com/geosearch) key

We would recommend installing globally `serve`. To serve the examples

```bash
yarn global add serve
# or
npm i -g serve
```

## Getting started

To set up the environment, once:

```bash
# install the dependencies
yarn
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

This will create symbolic links, so the examples can use the locally built version of the packages.

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

The playground is the [React example](./examples/react-example) which allows checking the built [core](./packages/geosearch-core) package.

Start the playground with the command

```bash
yarn playground:start
```

## Others examples

So far other examples are provided:

### simple example

It uses the bundle version of the package for an effortless integration in your website.

```bash
serve -S examples/simple-example
```

### Advanced example

it uses the core version of the package and demonstrates the different options on the geosearch

```bash
serve -S examples/advanced-example
```

### Multisources examples

Two examples how to use the plugin and other sources in the same autocomplete input.

```bash
serve -S examples/multiple-sources
```

check the examples:

1- open http://localhost:3000/ : adding your own data, a set of place in this example
2- open http://localhost:3000/index2.html: adding a aynch request, a query to wikipedia in this example

### Leaflet's plugin example

it uses the bundle version along with the dedicated [Leaflet](https://leafletjs.com/)'s plugin

```bash
serve -S examples/leaflet-plugin-example
```

check the examples:

1- open http://localhost:3000/
2- open http://localhost:3000/index-with-custom-marker

### OpenLayers library example

it uses the bundle version along with the dedicated [OpenLayers](https://openlayers.org/)'s plugin

```bash
serve -S examples/openlayers-library-example
```

1- open http://localhost:3000/

## linter

We use the `airbnb` config with `eslint`

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
# LOGIN on npmjs
npm login
# DO NOT FORGET TO BUILD FIRST
yarn build
# Let's publish
lerna publish --no-private

```

after publishing, run

```bash
yarn

yarn outdated
```

update the deps for the examples:

```
Package                  Current Wanted Latest Workspace
@opencage/geosearch-core 0.0.19  0.0.19 0.0.20 @opencage/nodejs-example
@opencage/geosearch-core 0.0.19  0.0.19 0.0.20 @opencage/geosearch-react-example
```

update the yarn lock file with

```bash
yarn
```

and finally commit with a post publish message:

```bash
git commit -am "post publish updates"
```

## Audit

Sometimes `yarn audit` fails. An alternative is

```bash
yarn audit --groups "dependencies"
```
