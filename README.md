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

# Distributing the workflow
In case you want to use this workflow or distibute it to other colleagues follow the following steps.

1. Make sure Setup > Prequisits are fullfilled on the computer
2. Clone repo 
3. $ npm install
4. $ bower install
5. 


# TODO
- [x] rescaffold cause generator is updated
- [x] intergrate grunt-remove-logging into the grunt build task set
- [ ] Strip down
- [ ] Change folder structure
- [ ] Setup ui-router
- [ ] setup grunt-notify
- [ ] Setup to have similar features to the original angular advanced seed project
- [ ] Change to Mocha/Sinon