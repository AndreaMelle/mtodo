'use strict';

module.exports = function(grunt)
{

  var watchFiles = {
    serverViews: ['app/views/**/*.*'],
    serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
    clientViews: ['public/modules/**/views/*.html'],
		clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
		clientCSS: ['public/modules/**/*.css']
  };

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      serverViews: {
				files: watchFiles.serverViews,
				options: {
					livereload: true
				}
			},
      serverJS : {
        files: watchFiles.serverJS,
        tasks: ['jshint'],
        options: { livereload: true }
      },
      clientViews: {
				files: watchFiles.clientViews,
				options: {
					livereload: true,
				}
			},
			clientJS: {
				files: watchFiles.clientJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			clientCSS: {
				files: watchFiles.clientCSS,
				tasks: ['csslint'],
				options: {
					livereload: true
				}
			}
    },

    jshint : {
      all: {
        src: watchFiles.serverJS,
        options: { jshintrc: true }
      }
    },

    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js, html',
          watch: watchFiles.serverViews.concat(watchFiles.serverJS)
        }
      }
    },

    concurrent: {
      default: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      },
    },

    env: {
      test: {
        NODE_ENV: 'test'
      },
      development: {
        NODE_ENV: 'development'
      },
    }


  });

  // Load NPM tasks
	require('load-grunt-tasks')(grunt);

  // Making grunt default to force in order not to break the project.
	grunt.option('force', true);

  // A Task for loading the configuration object
	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
		var init = require('./config/init')();
		var config = require('./config/config');

		grunt.config.set('applicationJavaScriptFiles', config.assets.js);
		grunt.config.set('applicationCSSFiles', config.assets.css);
	});

  // Default task(s).
	grunt.registerTask('default', ['env:development', 'concurrent:default']);

};
