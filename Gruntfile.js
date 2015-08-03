module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    "babel": {
      options: {
        sourceMap: true
      },
      dist: {
        files: [{
          "expand": true,
          "cwd": "modules/js/",
          "src": ["**/*.js"],
          "dest": "public/assets/js/",
          "ext": ".js"
        }]
      }
    },
    jade: {
      debug: {
        options: {
          data: {
            debug: true
          },
          pretty: true
        },
        files: {
          "debug/index.html": "modules/jade/index.jade",
        }
      },
      release: {
        options: {
          data: {
            debug: false
          },
          pretty: false
        },
        files: {
          "public/index.html": ["modules/jade/index.jade"],
        },
        compile: {
          expand: true
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      css: {
        src: ['modules/css/*.css'],
        dest: 'public/assets/css/main.css',
      }
    },
    cssmin: {
      main: {
        src: 'public/assets/css/main.css',
        dest: 'public/assets/css/main.min.css'
      }
    },
    /*uglify: {
      js: {
        options: {
          preserveComments: true
        },
        files: {
          'public/assets/js/index.min.js': 'public/assets/js/index.js'
        }
      }
    },*/
    watch: {
      jade: {
        files: ['**/*.jade'],
        tasks: ['jade'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['**/*.css'],
        tasks: ['concat:css'],
        options: {
          spawn: false,
        },
      },
      babel: {
        files: ['./modules/js/*.js'],
        tasks: ['babel'],
        options: {
          spawn: false,
        },
      },
    },
    eslint: {
      target: ['./modules/js/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('default', ['jade:debug', 'jade:release', 'concat:css',
                     'cssmin:main', 'babel', 'watch']);
};

/*
# Only concat CSS files
grunt concat:css

# Concat CSS and JS files, but don't do anything else
grunt concat
*/
