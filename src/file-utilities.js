"use strict";

const async = require("async");
const path = require("path");
const fs = require("fs");
const md5File = require("md5-file");
const utilities = require("extra-utilities");
const changeCase = require("change-case-bundled");

const fileUtilities = { };

fileUtilities.getFileInformation = function(filePath, callback) {
	if(!utilities.isFunction(callback)) {
		throw new Error("Missing or invalid callback function!");
	}

	if(utilities.isEmptyString(filePath)) {
		return callback(new Error("Missing or invalid file path!"));
	}

	return async.waterfall(
		[
			function(callback) {
				return fs.stat(
					filePath,
					function(error, stats) {
						if(utilities.isInvalid(stats)) {
							return callback(new Error("File does not exist."));
						}

						if(stats.isDirectory()) {
							return callback(new Error("Path is directory."));
						}

						if(error) {
							return callback(error);
						}

						return callback(null, stats.size);
					}
				);
			},
			function(fileSize, callback) {
				return md5File(filePath).then(function(md5Hash) {
					return callback(null, fileSize, md5Hash);
				}).catch(function(error) {
					return callback(error);
				});
			}
		],
		function(error, fileSize, md5Hash) {
			if(error) {
				return callback(error);
			}

			return callback(null, {
				fileSize: fileSize,
				md5: md5Hash
			});
		}
	);
};

fileUtilities.isFileSystemCaseSensitive = function(filePath) {
	if(utilities.isEmptyString(filePath)) {
		filePath = __dirname;
	}

	let originalStats = null;
	let invertedStats = null;

	try {
		originalStats = fs.statSync(filePath);
	}
	catch(error) {
		return null;
	}

	try {
		invertedStats = fs.statSync(path.join(path.dirname(filePath), changeCase.swapCase(path.basename(filePath))));
	}
	catch(error) {
		console.error(error);
		return error.code === "ENOENT" ? true : null;
	}

	return utilities.isValid(originalStats) && utilities.isInvalid(invertedStats) && originalStats.ino === invertedStats.ino;
};

module.exports = fileUtilities;
