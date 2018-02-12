# File Utilities

A collection of useful file helper functions.

## Server-Side Usage

```javascript
var fileUtilities = require("file-utilities");

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
