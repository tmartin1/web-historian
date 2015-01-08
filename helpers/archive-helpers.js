var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// return sitenames in sites.txt
exports.readListOfUrls = function(){
};

// check sites.txt for sitename
exports.isUrlInList = function(sitename){
};

// add sitename to sites.txt
exports.addUrlToList = function(sitename){
  // check list first, don't add if already on list
};

// check folder for site
exports.isURLArchived = function(sitename){
};

// add site to folder and removes sitename from sites.txt
exports.downloadUrls = function(){
  // handle async race condition
  // get page
};
