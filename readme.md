# imurmurhash-esm

[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]

[github_actions_link]: https://github.com/fisker/imurmurhash-esm/actions?query=branch%3Amain
[license_badge]: https://img.shields.io/npm/l/prettier-format.svg?style=flat-square
[license_link]: https://github.com/fisker/imurmurhash-esm/blob/main/license
[package_version_badge]: https://img.shields.io/npm/v/imurmurhash-esm.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/imurmurhash-esm

> An incremental implementation of MurmurHash3 for JavaScript.

ESM(ES modules) version of NPM package [imurmurhash](https://www.npmjs.com/package/imurmurhash) in.

## Install

```bash
yarn add imurmurhash-esm
```

## Usage

```js
import MurmurHash3 from 'imurmurhash-esm'

// Create the initial hash
var hashState = MurmurHash3('string');

// Incrementally add text
hashState.hash('more strings');
hashState.hash('even more strings');

// All calls can be chained if desired
hashState.hash('and').hash('some').hash('more');

// Get a result
hashState.result();
// returns 0xe4ccfe6b
```
