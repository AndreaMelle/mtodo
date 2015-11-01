'use strict';

angular.module('notes').factory('Notes', ['$resource',
	function($resource) {
		return $resource('notes/:noteId', {
			noteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
