# Opencage Geosearch javascript client library developer documentation

As usual, please clone the repo first.

We use [lerna](https://lerna.js.org/) in addition to [pnpm workspaces](https://pnpm.io/workspaces).

The prerequisites are :

- [node](https://nodejs.org/en/download/) 22 or higher
- [pnpm](https://pnpm.io/) or (`corepack enable`)
- An [OpenCage geosearch](https://opencagedata.com/geosearch) key

We would recommend installing globally `serve` to serve the examples.

```bash
pnpm add --global serve
# or
yarn global add serve
# or
npm i -g serve
```

## Getting started

To set up the environment, once:

```bash
# install the dependencies
pnpm i
```

Create `.env` file containing your personal Key

```bash
pnpm dotenv <YOUR-GEOSEARCH-KEY>
```

This will create a `.env` file in :

- [packages/geosearch-core](./packages/geosearch-core)
- [examples/react-example](./examples/react-example)

Create the symbolic links

```bash
pnpm symlinks
```

This will create symbolic links, so the examples can use the locally built version of the packages.

## Build and watch

To build the packages run the command

```bash
pnpm build
```

To run a continuous build, use the command

```bash
pnpm watch
```

## Playground

The playground is the [React example](./examples/react-example) which allows checking the built [core](./packages/geosearch-core) package.

Start the playground with the command:

```bash
pnpm playground:start
```

## Others examples

So far other examples are provided:

### simple example

It uses the bundle version of the package for an effortless integration in your website.

```bash
npx serve -S examples/simple-example
```

### Advanced example

It uses the core version of the package and demonstrates the different options on the geosearch.

```bash
npx serve -S examples/advanced-example
```

### Multi sources examples

Two examples how to use the plugin and other sources in the same autocomplete input.

```bash
npx serve -S examples/multiple-sources
```

check the examples:

1- open http://localhost:3000/ : adding your own data, a set of place in this example
2- open http://localhost:3000/index2.html: adding an asynchronous request, a query to wikipedia in this example.

### Leaflet's plugin example

It uses the bundle version along with the dedicated [Leaflet](https://leafletjs.com/)'s plugin

```bash
npx serve -S examples/leaflet-plugin-example
```

check the examples:

1- open http://localhost:3000/
2- open http://localhost:3000/index-with-custom-marker

### OpenLayers library example

It uses the bundle version along with the dedicated [OpenLayers](https://openlayers.org/)'s plugin

```bash
npx serve -S examples/openlayers-library-example
```

1- open http://localhost:3000/

## linter

We use the `airbnb` config with `eslint`

```bash
pnpm lint
```

## unit tests

```bash
pnpm test
```

## coverage

```bash
pnpm test:coverage
```

Then, open your browser with `open ./packages/geosearch-core/coverage/index.html`

## Clean build packages

Run the command

```bash
pnpm build:clean
```

## Remove node_modules folders

```bash
pnpm clean
```

## Publish to npmjs.com

```bash
# LOGIN on npmjs
npm login
# DO NOT FORGET TO BUILD FIRST
pnpm build
# Let's publish
npx lerna publish --no-private

```

After publishing, run

```bash
pnpm i

pnpm outdated
```

Update the deps for the examples:

```
Package                  Current Wanted Latest Workspace
@opencage/geosearch-core 0.0.19  0.0.19 0.0.20 @opencage/nodejs-example
@opencage/geosearch-core 0.0.19  0.0.19 0.0.20 @opencage/geosearch-react-example
```

Update the pnpm lock file with

```bash
pnpm i
```

And finally commit with a post publish message:

```bash
git commit -am "post publish updates"
```

## Audit

Sometimes `yarn audit` fails. An alternative is

```bash
yarn audit --groups "dependencies"
```
