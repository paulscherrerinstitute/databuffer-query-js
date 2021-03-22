# databuffer-query-js

JS client library for [databuffer DAQ queryrest API](https://git.psi.ch/sf_daq/ch.psi.daq.databuffer/tree/master/ch.psi.daq.queryrest).

## Installation

The npm package for _databuffer-query-js_ is hosted on [GitHub packages](https://github.com/features/packages). You need to setup the npm project in which you want to use _databuffer-query-js_ to use the GitHub packages npm package registry (instead of the default registry). To do that [GitHub packages documentation](https://docs.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages) recommends to create a file `.npmrc` in your npm project's root directory (next to `package.json`). This file should look something like this:

```
@paulscherrerinstitute:registry=npm.pkg.github.com
```

Now you can add _databuffer-query-js_ to your project as a dependency:

```sh
npm install --save '@paulscherrerinstitute/databuffer-query-js'
```

## Generate API documentation

If you want to generate the API documentation, get the source and run

```
npm run docs
```

## Developers / Contributing

- Install node.js (at least version 12, includes `npm`) -- if possible, we recommend to install node.js through [nvm](https://github.com/nvm-sh/nvm)
- Clone this repo
- Install dependencies: `npm install`
- Write tests
- Write code
- Run tests
- Commit, push
- Release new version
  - Run `npm run release` to get a preview of what will happen
  - Run `npm run release:prod` to automate the following
    - Update version in `package.json`
    - Update version in `package-lock.json`
    - Update `CHANGELOG.md`
    - Commit changes and tag them
  - Push the commits and tag: `git push --follow-tags origin master`
  - GitHub actions will publish the package
