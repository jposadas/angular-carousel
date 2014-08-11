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
			url: '/submit',
			templateUrl: 'submit.html',
			controller: 'submitCtrl'
		});

}]);

app.controller('questionnaireCtrl', ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {

	var numQuestions = parseInt(document.getElementById('body').getAttribute('data-num-questions'));
	console.log('Number of questions: ' + numQuestions);

	$scope.data = [];
	$scope.$on('questionAnswered', function(event, args) {

		var index = lookup($scope.data, args.questionID);
		var obj = {questionID: args.questionID, answer: args.answer};
		var order = parseInt(args.order);

		if (index < 0) {
			$scope.data.push(obj);
		} else {
			$scope.data[index] = obj;
		}

		if (order < numQuestions) {
			$state.go('q' + (order + 1));
		} else {
			$state.go('submit');
		}

	});
}]);

app.controller('questionCtrl', ['$rootScope' ,'$scope', '$state', function($scope, $rootScope, $state) {

	var elem = document.getElementById('currentQuestion');
	var questionID = elem.getAttribute('data-question-id');
	var questionOrder = elem.getAttribute('data-question-order');
	
	$scope.submit = function(answer) {
		$rootScope.$emit('questionAnswered', {questionID: questionID, answer: answer, order: questionOrder});
	};
}]);

app.controller('submitCtrl', ['$scope', function($scope) {

}]);

var lookup = function(arr, elem) {

	for(var i = 0; i < arr.length; i++) {
		if(arr[i].questionID === elem) return i;
	}
	return -1;

};