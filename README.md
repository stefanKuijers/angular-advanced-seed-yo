angular-advanced-seed-yo
========================

# Description
An angular seed for medium to large web applications.
The base was generated using the yeoman angular generator.

# Setup
To setup this repo I went through the following steps

## Prequisits
Before you start make sure your username does not contain accented latin characters
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
  - watching for file changes 
  - compiling sass
  - distribution
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

# Distributing the workflow
In case you want to use this workflow or distibute it to other colleagues follow the following steps.

1. Make sure Setup > Prequisits are fullfilled on the computer
2. Clone repo 
3. $ npm install
4. $ bower install
5. 
