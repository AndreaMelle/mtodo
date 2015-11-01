'use strict';

// I don't want to use a template engine for a single page app

module.exports = {
  app : {
    title: 'TODO',
    description: 'Another TODO app',
    keywords: 'TODO, app'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'b4805fc0be5d4bbca950b56b821ffd18',
  sessionCollection: 'sessions',
  assets: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
      ],
      js: [
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
        'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',

        'public/lib/angular-ui-scroll/dist/ui-scroll.js',
        'public/lib/angular-ui-scrollpoint/dist/scrollpoint.js',
        'public/lib/angular-ui-event/dist/event.js',
        'public/lib/angular-ui-mask/dist/mask.js',
        'public/lib/angular-ui-validate/dist/validate.js',
        'public/lib/angular-ui-indeterminate/dist/indeterminate.js',
        'public/lib/angular-ui-uploader/dist/uploader.js',

				'public/lib/angular-ui-utils/index.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js'
      ]
    },
    css: [
      'public/modules/**/css/*.css'
    ],
    js: [
      'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
    ],
    tests: []
  }
};
