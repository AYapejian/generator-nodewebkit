'use strict';

var fs = require('fs');

window.onload = function () {
  fs.readFile('package.json', 'utf8', function (error, data) {
    var output = error ? error : data;

    var textArea = document.createElement('textarea');
    textArea.setAttribute('class', 'file-contents');
    textArea.value = data;

    document.getElementById('content-container').appendChild(textArea);
  });
};