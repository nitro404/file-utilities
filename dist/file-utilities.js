var async = require("async");
var fs = require("fs-extra");
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
				return fs.exists(
					filePath,
					function(exists) {
						return callback(null, exists);
					}
				);
			},
			function(exists, callback) {
				if(!exists) {
					return callback(null, null);
				}

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
				if(utilities.isInvalid(fileSize)) {
					return callback(null, null, null);
				}

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

			if(utilities.isInvalid(fileSize) || utilities.isInvalid(hash)) {
				return callback(null, null);
			}

			return callback(null, {
				fileSize: fileSize,
				md5: hash
			});
		}
	);
};

module.exports = fileUtilities;
