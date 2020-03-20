# File Utilities

[![NPM version][npm-version-image]][npm-url]
[![Build Status][build-status-image]][build-status-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Known Vulnerabilities][vulnerabilities-image]][vulnerabilities-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![Downloads][npm-downloads-image]][npm-url]
[![Install Size][install-size-image]][install-size-url]
[![Contributors][contributors-image]][contributors-url]
[![Pull Requests Welcome][pull-requests-image]][pull-requests-url]

A collection of useful file helper functions.

## Server-Side Usage

```javascript
const fileUtilities = require("file-utilities");

fileUtilities.getFileInformation(
	"./data/test.txt",
	function(error, info) {
		if(error) {
			return console.error(error);
		}

		return console.log(info);
	}
);
```

## Installation

To install this module:
```bash
npm install file-utilities
```

## Building

To build the distribution files for this module:
```bash
npm run build
```
or
```bash
gulp build
```

[npm-url]: https://www.npmjs.com/package/file-utilities
[npm-version-image]: https://img.shields.io/npm/v/file-utilities.svg
[npm-downloads-image]: http://img.shields.io/npm/dm/file-utilities.svg

[build-status-url]: https://travis-ci.org/nitro404/file-utilities
[build-status-image]: https://travis-ci.org/nitro404/file-utilities.svg?branch=master

[coverage-url]: https://coveralls.io/github/nitro404/file-utilities?branch=master
[coverage-image]: https://coveralls.io/repos/github/nitro404/file-utilities/badge.svg?branch=master

[vulnerabilities-url]: https://snyk.io/test/github/nitro404/file-utilities?targetFile=package.json
[vulnerabilities-image]: https://snyk.io/test/github/nitro404/file-utilities/badge.svg?targetFile=package.json

[dependencies-url]: https://david-dm.org/nitro404/file-utilities
[dependencies-image]: https://img.shields.io/david/nitro404/file-utilities.svg

[install-size-url]: https://packagephobia.now.sh/result?p=file-utilities
[install-size-image]: https://badgen.net/packagephobia/install/file-utilities

[contributors-url]: https://github.com/nitro404/file-utilities/graphs/contributors
[contributors-image]: https://img.shields.io/github/contributors/nitro404/file-utilities.svg

[pull-requests-url]: https://github.com/nitro404/file-utilities/pulls
[pull-requests-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
