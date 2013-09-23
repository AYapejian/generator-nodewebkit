// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
 
module.exports = function (grunt) {
 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  // TODO: Build the node-webkit apps for Win, OSX and Linux
  // https://github.com/rogerwang/node-webkit/wiki/How-to-package-and-distribute-your-apps
  grunt.registerTask('build', ['build_win', 'build_osx', 'build_linux']);

  grunt.registerTask('build_win', '', function () {
    grunt.log.write('Building Windows: ').ok();

    // copy /b nw.exe+app.nw app.exe 
  
  });

  grunt.registerTask('build_osx', '', function () {
    grunt.log.write('Building OSX: ').ok();
  
  });

  grunt.registerTask('build_linux', '', function () {
    grunt.log.write('Building Linux: ').ok();
  
  });
};