var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!
var rootPath = __dirname+'/../';

var handleRequest = function (req, res) {
  var actions = {
    'GET': routeGET,
    'POST': routePOST,
    'OPTION': routeOPTIONS
  };
  actions[req.method](req, res);
};

var routeGET = function(req, res) {
  var routes = {
    '/': 'public/index.html',
    '/styles.css': 'public/styles.css'
  };

  if (!routes.hasOwnProperty(req.url)) {
    res.writeHead(404, httpHelpers.headers);
    res.end();
  } else {
    // res.writeHead(200, httpHelpers.headers);
    httpHelpers.serveAssets(res, routes[req.url]);
  }
};

var routePOST = function(req, res){
  res.writeHead(302, httpHelpers.headers);
  req.on('data', function(data){
    var sitename = data.toString().slice(4);
    archive.isURLArchived(rootPath+'web/archives/sites/www.'+sitename, function(result) {
      if (result) {
        httpHelpers.serveAssets(res, rootPath+'web/archives/sites/www.'+sitename);
      } else {
        httpHelpers.serveAssets(res, rootPath+'web/public/loading.html');
        archive.addUrlToList(rootPath+'web/archives/sites.txt', sitename);
      }
    });
  });
};

var routeOPTIONS = function(req, res){
  // needed?
};

exports.handleRequest = handleRequest;
