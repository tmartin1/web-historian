var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

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
    var sitename = data.toString();
    //archive-helpers
    if (archive.isURLArchived(sitename)) {
      // return the html
      httpHelpers.serveAssets(res, 'archives/sites/'+sitename);
    } else {
      // display 'loading'
      httpHelpers.serveAssets(res, 'public/loading.html');
      // add sitename to list
      httpHelpers.addUrlToList(sitename);
    }
  });
  return response;
};

var routeOPTIONS = function(req, res){
  // needed?
};

exports.handleRequest = handleRequest;
