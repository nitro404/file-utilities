"use strict";

var async = require("async");
var path = require("path");
var fs = require("fs");
var md5File = require("md5-file");
var utilities = require("extra-utilities");

var fileUtilities = { };

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
						if(error) {
							return callback(error);
						}

						return callback(null, stats.size);
					}
				);
			},
			function(fileSize, callback) {
				return md5File(
					filePath,
					function(error, hash) {
						if(error) {
							return callback(error);
						}

						return callback(null, fileSize, hash);
					}
				);
			}
		],
		function(error, fileSize, hash) {
			if(error) {
				return callback(error);
			}

			return callback(null, {
				fileSize: fileSize,
				md5: hash
			});
		}
	);
};

fileUtilities.isFileSystemCaseSensitive = function(filePath) {
	if(utilities.isEmptyString(filePath)) {
		filePath = __dirname;
	}

	var originalStats = null;
	var invertedStats = null;

	try {
		originalStats = fs.statSync(filePath);
	}
	catch(error) {
		return null;
	}

	try {
		invertedStats = fs.statSync(path.join(path.dirname(filePath), changeCase.swap(path.basename(filePath))));
	}
	catch(error) {
		return error.code === "ENOENT" ? true : null;
	}

	return utilities.isValid(originalStats) && utilities.isInvalid(invertedStats) && originalStats.ino === invertedStats.ino;
};

module.exports = fileUtilities;
