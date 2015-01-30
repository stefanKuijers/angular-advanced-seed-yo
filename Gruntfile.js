'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  // require('time-grunt')(grunt);

  // The folder in which the developer will work. Typically called 'src' or 'app'
  var source  = 'src';

  // folder names
  var folders = {
    source      : source,
    test        : 'test',
    distribution: 'dist',
    app         : source + '/app',
    sass        : source + '/asset/sass',
    css         : source + '/asset/css',
    image       : source + '/asset/image',
    tmp         : '.tmp'
  };

  var paths = {
    js    : folders.source + '/app/**/*.js',
    sass  : folders.source + '/asset/sass/*.scss',
    html  : folders.source + '/app/**/*.html',
    css   : folders.source + '/asset/css/*.css',
    image : folders.source + '/asset/image/*.{png,jpg,jpeg,gif,webp,svg}',
    test  : 'test/spec/{,*/}*.js',
    index : folders.source + '/index.html'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    folder: folders,
    path  : paths,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= path.js %>'],
        tasks: ['karma'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['<%= path.test %>'],
        tasks: ['karma']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= path.html %>',
          '<%= path.css %>',
          '<%= path.image %>',
          '<%= path.index %>'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              // connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static( folders.source )
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              // connect.static('.tmp'),
              connect.static( folders.test ),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static( folders.source )
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= folder.distribution %>'
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= folder.distribution %>/{,*/}*',
            '!<%= folder.distribution %>/.git{,*/}*',
            '<%= folder.css %>/*.css'
          ]
        }]
      },
      server: '.tmp',
    },

    // Add vendor prefixed style
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= folder.css %>',
          src: '*.css',
          dest: '<%= folder.css %>'
        }]
      }
    },

    // Automagically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= folder.source %>/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['<%= folder.sass %>{,*/}*.scss'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },


    // removes any console logs from javascript code. 
    // NOTE: Does not work on minified files and seems to remove the WHOLE LINE from where it finds a log.
    removelogging: {
        dist: {
            src: '.tmp/concat/{,*/}*.js'// Each file will be overwritten with the output!
        }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= folder.distribution %>/script/{,*/}*.js',
          '<%= folder.distribution %>/app/{,*/}*.js',
          '<%= folder.distribution %>/css/{,*/}*.css',
          '<%= folder.distribution %>/image/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= folder.distribution %>/css/font/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= folder.source %>/index.html',
      options: {
        dest: '<%= folder.distribution %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= folder.distribution %>/app/**/*.html','<%= folder.distribution %>/index.html'],
      css: ['<%= folder.distribution %>/css/*.css'],
      options: {
        assetsDirs: ['<%= folder.distribution %>','<%= folder.distribution %>/image']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= folder.source %>/image',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= folder.distribution %>/image'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= folder.source %>/image',
          src: '{,*/}*.svg',
          dest: '<%= folder.distribution %>/image'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= folder.distribution %>',
          src: ['index.html', 'app/**/*.html'],
          dest: '<%= folder.distribution %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/script',
          src: ['*.js', '!oldieshim.js'],
          dest: '.tmp/concat/script'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= folder.distribution %>/index.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= folder.source %>',
          dest: '<%= folder.distribution %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            '<%= path.html %>',
            'image/{,*/}*.{webp}',
            'font/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/image',
          dest: '<%= folder.distribution %>/image',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '<%= folder.app %>',
          dest: '<%= folder.distribution %>/app',
          src: ['**/*.html']
        }
      ]}
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= folder.sass %>',
        cssDir: '<%= folder.css %>',
        generatedImagesDir: '.tmp/image/generated',
        imagesDir: '<%= folder.source %>/image',
        javascriptsDir: '<%= folder.app %>',
        fontsDir: '<%= folder.css %>/font',
        importPath: './bower_components',
        httpImagesPath: '/image',
        httpGeneratedImagesPath: '/image/generated',
        httpFontsPath: '/css/font',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
            outputStyle: 'compressed',
          generatedImagesDir: '<%= folder.distribution %>/image/generated'
        }
      },
      server: {
        options: {
          debugInfo: true,
          watch: true
        }
      },
      build: {
        options: {
            debugInfo: false,
        }
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
        watch: {
            tasks: [ 'watch', 'compass:server'],
            options: {
                logConcurrentOutput: true
            }
        },
        server: [
            'compass:server'
        ],
        test: [
            'compass'
        ],
        dist: [
            'compass:dist',
            'imagemin',
            'svgmin'
        ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'autoprefixer',
      // 'watch',
      'connect:livereload',
      'concurrent:watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'removelogging',
    'copy:dist',
    // 'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};
