angular-advanced-seed-yo
========================

# Description
An angular seed for medium to large web applications.
The base was generated using the yeoman angular generator.

The purpose of this seed is to make it easy to start of angular projects in a proper workflow.


# Distributing the workflow
In case you want to use this workflow or distibute it to colleagues follow the following steps.

## Prerequisits
These are dependencies of which you probably already have most installed.

1. Node, Git and Ruby installed
2. $ npm install -g grunt-cli && npm install -g bower
3. $ (gem install sass) && gem install compass

## Kickstart your project
When you have successfully installed the prerequisits
1. (optionally fork first) Clone repo && cd into folder
2. $ npm install && bower install
3. grunt serve
4. start coding


# Initial Setup
To setup this repo I went through the following steps

## Prerequisits
Before you start make sure your username does not contain accented latin characters.

1. Node installed
2. Git installed
3. $ npm install -g grunt-cli
4. $ npm install -g yo
5. $ npm install -g bower
6. Ruby installed
7. $ gem install sass 
  If any problems with a certificate download the gem via http.
  Set the source to try on http if https fails by the following command
  - $ gem sources --add http://rubygems.org 
8. $ gem install compass

## Installation
1. $ npm install -g generator-angular
2. $ mkdir \<folderName\> && cd $_
3. $ yo angular \<appName\>
  - Sass? Y
  - Twitter Bootstrap? n
  - Choose Angular modules
4. $ bower install bootstrap-css-only --save
5. $ bower install font-awesome --save

## Verifing installation
1. Check or folders are created
2. Check or basic grunt commands run
  - $ grunt 
  - $ grunt test
3. Run the grunt server ( $ grunt serve )

## Installing further components and modules to enhance workflow
1. $ bower install bootstrap-css-only --save
  --save saves the plugin as a dependency of the project.
  If someone clones the repo they only have to run [$ bower install]
  and they get all bower components they need
1. $ bower install font-awesome --save 
3. $ npm install grunt-remove-logging --save-dev 
  --save-dev saves it as a development dependency

## Further Adjustments
To make this repo fit as a seed for medium to large scale apps I decided to make more changes. If you just want to get started with Yeoman and Angular your journey ends here. I you want to use this seed project as is you can follow the instructions in the 'Distributing Workflow' section. I have implemented the following changes:
1. [ ] Restructured the app after the component-grouped paradigm
2. [ ] Updating all the grunt tasks to work again
  - [x] setting up new structure
  - [x] watching for file changes 
  - [x] compiling sass
  - [x] unit tests
  - [x] copy templates to distribution folder
  - [-] cleaning up old files and paths
  - [-] css does not get minified and copied from the .tmp/style/app.css -> dist/style/
  - [x] fixing javascript minification
  - [ ] distribution
3. [x] Switched to ui-router:
  - $ bower uninstall angular-router --save
  - $ bower install ui-router --save
  - rewrote the router code
4. [x] Installing angular bootstrap
  - $ bower install angular-bootstrap --save
  - if you have any problems just go to http://angular-ui.github.io/bootstrap/ and download it from there
5. [ ] Setup grunt notify:
  - $ npm install grunt-notify --save-dev
6. [ ] Switched from jasmine to Mocha/Sinon
7. [ ] Write some meaningfull tests


# Future
1. research or templates could be concatenated as well as now each template is an http request
