'use strict';

var fs = require('fs');

window.onload = function () {
  fs.readFile('package.json', 'utf8', function (error, data) {
    var output = error ? error : data;

    document.getElementById('content-container').innerHTML = output;
  });
};