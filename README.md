# databuffer-query-js

JS client library for [databuffer DAQ queryrest API](https://git.psi.ch/sf_daq/ch.psi.daq.databuffer/tree/master/ch.psi.daq.queryrest).

## Installation

If you haven't already done so, enable the PSI private npm registry:

```sh
npm config set '@psi:registry' http://npm.psi.ch
```

Add databuffer-qureyrest to your project as a dependency:

```sh
npm install --save '@psi/databuffer-query-js'
```

## Generate API documentation

If you want to generate the API documentation, get the source and run

```
npm run docs
```

## Developers / Contributing

- Install node.js (at least version 10, includes `npm`)
- Clone this repo
- Install dependencies: `npm install`
- Write tests
- Write code
- Commit, push
- Release new version
  - Update version in `package.json`
  - Test release by running `npm run mypack` and inspecting the result (file `psi-databuffer-query-js-$VERSION.tgz`)
  - Commit, tag, push
  - Publish to npm registry `npm run mypublish`
