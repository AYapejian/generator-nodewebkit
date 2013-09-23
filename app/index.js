'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NodewebkitGenerator = module.exports = function NodewebkitGenerator (args, options, config) {
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
    {
      type: 'input',
      name: 'gitUser',
      message: 'Your github username(for .git url):',
      default: 'Not Set'
    },

    // NODE-WEBKIT OPTIONS
    {
      type: 'input',
      name: 'windowWidth',
      message: 'Window width on launch:',
      default: '800',
      validate: function (value) {
        return value.match(/^\d+$/) ? true : 'Please enter a valid number';
      },
      filter: function (value) {
        return isNaN(value) ? parseInt(value, 10) : value;
      }
    },
    {
      type: 'input',
      name: 'windowHeight',
      message: 'Window height at launch:',
      default: '600',
      validate: function (value) {
        return value.match(/^\d+$/) ? true : 'Please enter a valid number';
      },
      filter: function (value){
        return isNaN(value) ? parseInt(value, 10) : value;
      } // TODO: Add other node-webkit options for the package.json window definition
    },

    // INCLUDED LIBRARY OPTIONS
    {
      type: 'checkbox',
      message: 'Select included libraries:',
      name: 'vendorLibrariess',
      choices: [
        { name: 'jQuery', value: 'jquery', checked: true },
        { name: 'AngularJS', value: 'angularjs', checked: true },
        { name: 'Bootstrap', value: 'bootstrap', checked: true }
      ],
      validate: function (answers) {
        var jquery = answers.indexOf('jquery') > -1 ? true : false;
        var bootstrap = answers.indexOf('bootstrap') > -1 ? true : false;

        if (bootstrap && !jquery) { 
          return "Bootstrap requires jQuery";
        } else {
          return true;
        }
      }
    }
  ];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.projectDescription = props.projectDescription;
    this.gitUser = props.gitUser;

    this.windowWidth = props.windowWidth;
    this.windowHeight = props.windowHeight;
    
    this.vendorLibraries = {};
    this.vendorLibraries.jquery = props.vendorLibrariess.indexOf('jquery') > -1 ? true : false;
    this.vendorLibraries.angularjs = props.vendorLibrariess.indexOf('angularjs') > -1 ? true : false;
    this.vendorLibraries.bootstrap = props.vendorLibrariess.indexOf('bootstrap') > -1 ? true : false;

    cb();
  }.bind(this));
};

NodewebkitGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/css');
  this.mkdir('app/js');
  this.mkdir('app/imgs');
  this.mkdir('app/vendor');

  this.template('app/_index.html', 'app/index.html');

  this.copy('app/css/app.css', 'app/css/app.css');
  this.copy('app/js/app.js', 'app/js/app.js');
  this.copy('app/imgs/window_icon.png', 'app/imgs/window_icon.png');
  
  // Copy over requested vendor files
  if (this.vendorLibraries.jquery) {
    this.copy('app/vendor/jquery.js', 'app/vendor/jquery.js');
  }

  if (this.vendorLibraries.angularjs) {
    this.copy('app/vendor/angular.js', 'app/vendor/angular.js');
  }

  if (this.vendorLibraries.bootstrap) {
    this.directory('app/vendor/bootstrap', 'app/vendor/bootstrap');
  }

  this.template('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('_README.md', 'README.md');
  this.copy('gitignore', '.gitignore');
};

NodewebkitGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
