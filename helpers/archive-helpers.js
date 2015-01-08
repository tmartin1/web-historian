var fs = require('fs');
var _ = require('underscore');
var path = require('path');
var http = require('http');
var https = require('https'); // ?
var rootPath = __dirname+'/../';

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
exports.readListOfUrls = function(filepath, cb){
  // filepath should be '../web/archives/sites.txt'
  fs.readFile(filepath, function(err, data){
    if(err) throw err;
    var sites = data.toString().split("\n");
    sites.pop();
    cb(sites);
  });
};

// check sites.txt for sitename
exports.isUrlInList = function(filepath, sitename, cb){
  exports.readListOfUrls(filepath, function(sites) {
    return cb(sites.indexOf(sitename) >= 0);
  });
};

// add sitename to sites.txt
exports.addUrlToList = function(filepath, sitename){
  // check list first, don't add if already on list
  exports.isUrlInList(filepath, sitename, function(doesExist){
    if(!doesExist){
      // filepath should be '../web/archives/sites.txt'
      fs.appendFile(filepath, sitename+'\n', function(err, data){
        if(err) throw err;
      });
    }
  });
};

// check folder for site
exports.isURLArchived = function(filepath, cb){
  // filepath should be '../web/archives/sites/www.'
  fs.stat(filepath, function(err, stats){
    if(err) cb(false);
    else cb(stats.isFile());
  });
};

// add site to folder and removes sitename from sites.txt
exports.downloadUrls = function(sites){
  _.each(sites, function(site){
    console.log('scaping site: ', site);
    exports.scrape(site);
  });
};

exports.scrape = function(site){
  var req = http.get("http://"+site, function(res){
    var bodyChunks = [];
    res.on('data', function(chunk){
      bodyChunks.push(chunk);
    });
    res.on('end', function(){
      var body = Buffer.concat(bodyChunks);
      fs.writeFile(rootPath+'/web/archives/sites/www.'+site, body, function(err){
        if(err) throw err;
        exports.updateSitesFile();
      });
    });
  });
  req.on('error', function(err){
    console.log('ERROR: ', err);
  });
};

// remove site from site.txt
// reads list again to ensure changes since downloadUrls was called are accounted for.
exports.updateSitesFile = function(sites){
  exports.readListOfUrls(rootPath+'/web/archives/sites.txt', function(sites){
    sites.shift();
    sites.join('\n');
    // overwrite sites.txt
    fs.writeFile(rootPath+'/web/archives/sites.txt', sites, function(err){
      if(err) throw err;
    });
  });
};

