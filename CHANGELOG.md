# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
