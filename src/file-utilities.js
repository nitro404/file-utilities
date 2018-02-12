var fs = require("fs-extra");
var md5File = require("md5-file");
var utilities = require("extra-utilities");

var fileUtilities = { };

fileUtilities.getFileInformation = function(filePath, callback) {
	if(!utilities.isFunction(callback)) {
		throw new Error("Missing or invalid callback function!");
	}

	if(typeof filePath !== "string" || filePath.length === 0) {
		return callback(new Error("Missing or invalid file path!"));
	}

	if(!fs.existsSync(filePath)) {
		return callback(null, null);
	}

	return md5File(
		filePath,
		function(error, hash) {
			if(error) {
				return callback(error);
			}

			return callback(null, {
				fileSize: fs.statSync(filePath).size,
				md5: hash
			});
		}
	);
};

module.exports = fileUtilities;
