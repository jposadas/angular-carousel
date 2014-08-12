var app = angular.module('outfittery-questionnaire', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.when('', 'q1');

	$stateProvider
		.state('q1', {
			url: '/q1',
			templateUrl: 'q1.html',
			controller: 'questionCtrl'
		})
		.state('q2', {
			url: '/q2',
			templateUrl: 'q2.html',
			controller: 'questionCtrl'
		})
		.state('q3', {
			url: '/q3',
			templateUrl: 'q3.html',
			controller: 'questionCtrl'
		})
		.state('submit', {
			url: '/submit:data',
			templateUrl: 'submit.html',
			controller: 'submitCtrl'
		});

}]);

app.controller('questionnaireCtrl', ['$scope', '$state', 'submitData', function($scope, $state, submitData) {

	var numQuestions = parseInt(document.getElementById('header').getAttribute('data-num-questions'));
	console.log('Number of questions: ' + numQuestions);

	$scope.$on('questionAnswered', function(event, args) {

		submitData.pushData(args.questionID, args.answer);
		
		var order = parseInt(args.order);
		if (order < numQuestions && submitData.length() < numQuestions) {
			$state.go('q' + (order + 1));
		} else {
			$state.go('submit');
		}

	});
}]);

app.controller('questionCtrl', ['$scope', '$rootScope', 'submitData', function($scope, $rootScope, submitData) {

	var elem = document.getElementById('currentQuestion');
	var questionID = elem.getAttribute('data-question-id');
	var questionOrder = elem.getAttribute('data-question-order');
	
	$scope.questionID = questionID;
	$scope.answer = submitData.getValue(questionID);
	$scope.submit = function(answer) {
		console.log('trying to submit ' + answer);
		$rootScope.$broadcast('questionAnswered', {questionID: questionID, answer: answer, order: questionOrder});
	};
}]);

app.controller('submitCtrl', ['$scope', '$window', 'submitData', function($scope, $window, submitData) {
	$scope.data = submitData.getData();

	$scope.submit = function() {
		$window.alert('Preferences submitted');
	};
}]);

app.factory('submitData', function() {
	var data = {};
	return {
		getData: function() {
			return data;
		},
		getValue: function(key) {
			return data[key];
		},
		length: function() {
			return Object.keys(data).length;
		},
		pushData: function(key, value) {
			data[key] = value;
			console.log(data);
		}
	};
});
