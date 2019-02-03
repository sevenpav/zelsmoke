const { lstatSync, readdirSync } = require('fs');
const { join, basename } = require('path');

const isDir = source => lstatSync(source).isDirectory();

/**
 * Get all subdirectories basenames of the source directory 
 * @param {string} source
 * @return {Array}
 */

const getDirBasenames = source => readdirSync(source)
	.map(name => join(source, name))
	.filter(isDir)
	.map(dir => basename(dir));

module.exports.isDirectory = isDir;
module.exports.getDirBasenames = getDirBasenames;

