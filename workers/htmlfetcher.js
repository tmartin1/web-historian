// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var fs = require('fs');

fs.appendFile('/Users/HR10/2014-12-web-historian/workers/cronoutput.txt', 'CRONing', function(err) {
  if (err) throw err;
});
