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
  require('time-grunt')(grunt);

  // folder names
  var folders = {
    source      : 'app',
    test        : 'test',
    distribution: 'dist',
    app         : 'app/app',
    sass        : 'app/asset/sass',
    css         : 'app/asset/css',
    image       : 'app/asset/image',
    tmp         : '.tmp'
  };
  // Configurable paths for the application
  var appConfig = {
    app: 'app',
    dist: 'dist'
  };

  var paths = {
    js    : 'app/app/**/*.js',
    sass  : 'app/asset/sass/*.scss',
    html  : 'app/app/**/*.html',
    tmpCss: '.tmp/style/{,*/}*.css',
    image : 'app/asset/image/*.{png,jpg,jpeg,gif,webp,svg}',
    test  : 'test/spec/{,*/}*.js'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,
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
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= path.sass %>'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= path.html %>',
          '<%= path.tmpCss %>',
          '<%= path.image %>'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('<%= path.test %>'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
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

    // Make sure code style are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= path.js %>',
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['<%= path.test %>']
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
            '!<%= folder.distribution %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed style
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/style/',
          src: '{,*/}*.css',
          dest: '.tmp/style/'
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
        src: ['<%= folder.source %>/style/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: 'app/asset/sass',
        cssDir: '.tmp/style',
        generatedImagesDir: '.tmp/image/generated',
        imagesDir: '<%= folder.source %>/image',
        javascriptsDir: 'app/app/',
        fontsDir: '<%= folder.source %>/style/font',
        importPath: './bower_components',
        httpImagesPath: '/image',
        httpGeneratedImagesPath: '/image/generated',
        httpFontsPath: '/style/font',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= folder.distribution %>/image/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
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
          '<%= folder.distribution %>/style/{,*/}*.css',
          '<%= folder.distribution %>/image/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= folder.distribution %>/style/font/*'
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
              // js: ['concat'],

              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= folder.distribution %>/{,*/}*.html'],
      css: ['<%= folder.distribution %>/style/{,*/}*.css'],
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
          src: ['*.html', 'views/{,*/}*.html'],
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
        html: ['<%= folder.distribution %>/*.html']
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
      ]},
      style: {
        expand: true,
        cwd: '<%= folder.source %>/style',
        dest: '.tmp/style/',
        src: '{,*/}*.css'
      },
      moveScript: {

      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
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
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
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
    // 'copy:distView'
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    // 'newer:jshint',
    'test',
    'build'
  ]);
};
