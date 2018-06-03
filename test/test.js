"use strict";

var fileUtilities = require("../dist/file-utilities.js");
var utilities = require("extra-utilities");
var path = require("path");
var chai = require("chai");
var expect = chai.expect;

describe("File Utilities", function() {
	describe("getFileInformation", function() {
		it("should be a function", function() {
			expect(utilities.isFunction(fileUtilities.getFileInformation)).to.equal(true);
		});

		it("should throw an error if no callback function is provided", function() {
			var thrownError = null;

			try { fileUtilities.getFileInformation(); }
			catch(error) { thrownError = error; }

			expect(thrownError).to.not.equal(null);
			expect(thrownError.message).to.equal("Missing or invalid callback function!");
		});

		it("should return an error if an invalid path is provided", function(callback) {
			fileUtilities.getFileInformation(
				NaN,
				function(error, info) {
					expect(error).to.not.equal(null);
					expect(error.message).to.equal("Missing or invalid file path!");
					expect(info).to.be.undefined;

					return callback();
				}
			);
		});

		it("should correctly retrieve the file size and md5 hash for a file", function(callback) {
			fileUtilities.getFileInformation(
				path.join(__dirname, "/data/test.json"),
				function(error, info) {
					expect(error).to.equal(null);
					expect(utilities.isObjectStrict(info)).to.equal(true);
					expect(info.fileSize).to.equal(23);
					expect(info.md5).to.equal("6f353c05ed3598733d1c7b9b0d5fdabb");

					return callback();
				}
			);
		});

		it("should return an error for files that do not exist", function(callback) {
			fileUtilities.getFileInformation(
				path.join(__dirname, "/data/missing.json"),
				function(error, info) {
					expect(error).to.not.equal(null);
					expect(info).to.be.undefined;

					return callback();
				}
			);
		});

		it("should return an error for directories", function(callback) {
			fileUtilities.getFileInformation(
				path.join(__dirname, "/data"),
				function(error, info) {
					expect(error).to.not.equal(null);
					expect(info).to.be.undefined;

					return callback();
				}
			);
		});
	});
});
