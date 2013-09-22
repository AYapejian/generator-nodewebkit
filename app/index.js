'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NodewebkitGenerator = module.exports = function NodewebkitGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });


  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NodewebkitGenerator, yeoman.generators.Base);

NodewebkitGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    // PROJECT OPTIONS
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter project name:',
      default: 'Node Webkit Project'
    },
    {
      type: 'input',
      name: 'projectDescription',
      message: 'Enter project description:',
      default: 'Starting template for Node-Webkit'
    },

    // NODE-WEBKIT OPTIONS
    {
      type: 'input',
      name: 'windowWidth',
      message: 'Window width on launch:',
      default: '800',
      validate: function( value ) {
        return value.match(/^\d+$/) ? true : 'Please enter a valid number';
      },
      filter: function(value){
        return isNaN(value) ? parseInt(value, 10) : value;
      }
    },
    {
      type: 'input',
      name: 'windowHeight',
      message: 'Window height at launch:',
      default: '600',
      validate: function(value) {
        return value.match(/^\d+$/) ? true : 'Please enter a valid number';
      },
      filter: function(value){
        return isNaN(value) ? parseInt(value, 10) : value;
      } // TODO: Add other node-webkit options for the package.json window definition
    },

    // INCLUDED LIBRARY OPTIONS
    {
      type: 'checkbox',
      message: 'Select included libraries: (CURRENTLY NOT IMPLEMENTED)',
      name: 'includedLibraries',
      choices: [
        { name: 'jquery' },
        { name: 'angularjs' },
        { name: 'bootstrap' }
      ]
    }
  ];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.projectDescription = props.projectDescription;
    this.windowWidth = props.windowWidth;
    this.windowHeight = props.windowHeight;
    
    this.includedLibraries = props.includedLibraries;

    cb();
  }.bind(this));
};

NodewebkitGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/css');
  this.mkdir('app/js');
  this.mkdir('app/imgs');

  this.template('app/_index.html', 'app/index.html');

  this.copy('app/css/app.css', 'app/css/app.css');
  this.copy('app/js/app.js', 'app/js/app.js');
  this.copy('app/imgs/window_icon.png', 'app/imgs/window_icon.png');

  this.template('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

NodewebkitGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
