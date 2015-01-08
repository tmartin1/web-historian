// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('/Users/HR10/2014-12-web-historian/helpers/archive-helpers.js');

var filepath = '/Users/HR10/2014-12-web-historian/web/archives/sites.txt';
var urls = archive.readListOfUrls(filepath, function(sites){
  archive.downloadUrls(sites);
});


