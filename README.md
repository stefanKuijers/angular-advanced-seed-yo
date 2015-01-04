angular-advanced-seed-yo
========================

# Description
An angular seed for medium to large web applications.
The base was generated using the yeoman angular generator.

# Setup
To setup this repo I went through the following steps

## Prequisits
1. Node installed
2. Git installed
3. $ npm install -g grunt-cli
4. $ npm install -g yo
5. $ npm install -g bower

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
2. Check or basic grunt commands run ( $ grunt )
3. Run the grunt server ( $ grunt serve )
4. Get coding


# TODO
[ ] rescaffold cause generator is updated
[ ] Setup ui-router
[ ] Strip down
[ ] Change folder structure
[ ] Setup to have similar features to the original angular advanced seed project
[ ] Change to Mocha/Sinon