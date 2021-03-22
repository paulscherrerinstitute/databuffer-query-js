# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.6.7](https://github.com/paulscherrerinstitute/databuffer-query-js/compare/v0.6.6...v0.6.7) (2021-03-22)


### Bug Fixes

* add missing re-export of mapping module ([6f8b227](https://github.com/paulscherrerinstitute/databuffer-query-js/commit/6f8b227ced6c1cf5f1fe66206c3721f9dd751ace))

### [0.6.6](https://github.com/paulscherrerinstitute/databuffer-query-js/compare/v0.6.5...v0.6.6) (2021-03-22)


### Features

* add support for value mapping ([3d0856f](https://github.com/paulscherrerinstitute/databuffer-query-js/commit/3d0856f9342a1c19139fd24126f84686bde4032b)), closes [#19](https://github.com/paulscherrerinstitute/databuffer-query-js/issues/19)

### [0.6.5](https://github.com/paulscherrerinstitute/databuffer-query-js/compare/v0.6.4...v0.6.5) (2021-02-24)


### Features

* add parameters queries on QueryRest class ([6cb6df5](https://github.com/paulscherrerinstitute/databuffer-query-js/commit/6cb6df5960d9ec855459b52d91d4952173ee785d)), closes [#18](https://github.com/paulscherrerinstitute/databuffer-query-js/issues/18)

### [0.6.4](https://github.com/paulscherrerinstitute/databuffer-query-js/compare/v0.6.3...v0.6.4) (2020-09-22)

- Release / tag to force publishing to GitHub packages, see [#16](https://github.com/paulscherrerinstitute/databuffer-query-js/issues/16)

### [0.6.3](https://github.com/paulscherrerinstitute/databuffer-query-js/compare/v0.6.2...v0.6.3) (2020-09-22)

- Release / tag to force publishing to GitHub packages, see [#16](https://github.com/paulscherrerinstitute/databuffer-query-js/issues/16)

### [0.6.2](https://github.com/paulscherrerinstitute/databuffer-query-js/compare/v0.6.1...v0.6.2) (2020-09-22)

- Release for incorporating publishing to GitHub packages, see [#16](https://github.com/paulscherrerinstitute/databuffer-query-js/issues/16)

### [0.6.1](https://github.com/paulscherrerinstitute/databuffer-query-js/compare/v0.6.0...v0.6.1) (2020-06-24)

### Features

- return raw fetch response of data query ([778df77](https://github.com/paulscherrerinstitute/databuffer-query-js/commit/778df77f40082a6124a4c627157413a82ab3c638)), closes [#14](https://github.com/paulscherrerinstitute/databuffer-query-js/issues/14)

## [0.6.0](https://github.com/paulscherrerinstitute/databuffer-query-js/compare/v0.5.0...v0.6.0) (2020-04-09)

### Features

- support querying channel configurations ([9c96fb3](https://github.com/paulscherrerinstitute/databuffer-query-js/commit/9c96fb34162dc10b424ae899b8403775d2dd9a95)), closes [#13](https://github.com/paulscherrerinstitute/databuffer-query-js/issues/13)

## [0.5.0](https://github.com/paulscherrerinstitute/databuffer-query-js/compare/v0.4.1...v0.5.0) (2020-04-08)

### ⚠ BREAKING CHANGES

- Many types have been renamed to improve disambiguation.

### Features

- query parameters on the backend ([1af62eb](https://github.com/paulscherrerinstitute/databuffer-query-js/commit/1af62ebae77ca29c8cd82e25f561d43ab52650f9)), closes [#11](https://github.com/paulscherrerinstitute/databuffer-query-js/issues/11)
- rename data types ([3a48631](https://github.com/paulscherrerinstitute/databuffer-query-js/commit/3a48631decdb016220ad822d082998ad2d85ae69)), closes [#10](https://github.com/paulscherrerinstitute/databuffer-query-js/issues/10)

### [0.4.1](https://github.com/paulscherrerinstitute/databuffer-query-js/compare/v0.4.0...v0.4.1) (2020-03-27)

### Features

- add missing fields to interface `Event` ([a097bb7](https://github.com/paulscherrerinstitute/databuffer-query-js/commit/a097bb7ff9e4b53190a2028e2620c2e4cf1ec5a7)), closes [#9](https://github.com/paulscherrerinstitute/databuffer-query-js/issues/9)

## [0.4.0](https://github.com/paulscherrerinstitute/databuffer-query-js/compare/v0.3.0...v0.4.0) (2020-03-27)

### ⚠ BREAKING CHANGES

- Rename `DataPoint` to `Event` so it is more in line
  with the overall terminology used with the databuffer's backend.
  If you specifically used the type name in your code, then you will need
  to change it accordingly. If you only used type inference, you don't
  need to change your code.
- Rename enums to make the code easier to read:

* `ConfigFields` becomes `ConfigField`.
* `EventFields` becomes `EventField`.

### Features

- add ordering to data query request ([6f44722](https://github.com/paulscherrerinstitute/databuffer-query-js/commit/6f44722a68a8d1ddd25f3708417db74a0186e021))
- add typings for data query response with aggregation ([5af089f](https://github.com/paulscherrerinstitute/databuffer-query-js/commit/5af089fe3496393a82bb79b913b1fc2301b61a65)), closes [#8](https://github.com/paulscherrerinstitute/databuffer-query-js/issues/8)

* rename DataPoint to Event ([b48b6e1](https://github.com/paulscherrerinstitute/databuffer-query-js/commit/b48b6e1cd85552249920c65761ebc7687420206a))
* rename enums to singular ([07b1de3](https://github.com/paulscherrerinstitute/databuffer-query-js/commit/07b1de3ea42e4dc01820d00b5401b3c4f05af9ab))

## [0.3.0] - 2020-03-24

Initial release (on github)

### Added

- add data query EventFields
- add data query ConfigFields
- add missing details on aggregation

### Changed

- change generics usage to fix broken build (#6)

[unreleased]: https://github.com/paulscherrerinstitute/databuffer-query-js/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/paulscherrerinstitute/databuffer-query-js/compare/a3098f3b37d19c347a5ca98efbc46a7f61d179bd...v0.3.0
