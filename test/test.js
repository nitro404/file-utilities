"use strict";

var fileUtilities = require("../dist/file-utilities.js");
var utilities = require("extra-utilities");
var chai = require("chai");
var expect = chai.expect;

describe("File Utilities", function() {
	describe("getFileInformation", function() {
		it("should be a function", function() {
			expect(utilities.isFunction(fileUtilities.getFileInformation)).to.equal(true);
		});
	});
});
