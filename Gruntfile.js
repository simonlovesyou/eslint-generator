module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jade: {
      debug: {
        options: {
          data: {
            debug: true
          },
          pretty: true
        },
        files: {
          "debug/index.html": "dev/jade/layout.jade",
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
          "public/index.html": ["dev/jade/layout.jade"],
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
        src: ['dev/css/*.css'],
        dest: 'public/assets/css/main.css',
      },
      js: {
        src: ['dev/js/*.js'],
        dest: 'public/assets/js/index.js'
      }
    },
    cssmin: {
      main: {
        src: 'public/assets/css/main.css',
        dest: 'public/assets/css/main.min.css'
      }
    },
    uglify: {
      js: {
        options: {
          preserveComments: true
        },
        files: {
          'public/assets/js/index.min.js': 'public/assets/js/index.js'
        }
      }
    },
    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['concat:js', 'uglify:js'],
        options: {
          spawn: false,
        },
      },
      jade: {
        files: ['**/*.jade'],
        tasks: ['jade'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['**/*.css'],
        tasks: ['concat:basic', 'concat:extras', 'cssmin:main'],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jade:debug', 'jade:release', 'concat:css',
                      'concat:js', 'uglify:js', 'cssmin:main', 'watch']);
};

/*
# Only concat CSS files
grunt concat:css

# Concat CSS and JS files, but don't do anything else
grunt concat
*/
