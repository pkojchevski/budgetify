var app=angular.module("myApp",['ngRoute',"myApp.controllers", "myApp.services","myApp.directives",
  "myApp.filters", "nvd3", 'ui.bootstrap', 'angular-growl']);

app.config(["growlProvider", function(growlProvider) {
  growlProvider.globalTimeToLive(2000);
}]);

app.config(['$routeProvider','$httpProvider',
function($routeProvider, $httpProvider) {
    $routeProvider
                .when("/list", {
                templateUrl:"views/list.html",
                controller:"listController"
            })
            .when("/chart", {
            templateUrl:"views/chart.html",
            controller:"listController"
        })
        .when("/expenses", {
        templateUrl:"views/expenses.html",
        controller:"expensesController",
        controllerAs:'$ctrl'
    })
    .when("/income", {
    templateUrl:"views/income.html",
    controller:"incomeController",
    controllerAs:'incomeCtrl'
})
.when("/calendar", {
templateUrl:"views/calendar.html",
controller:"calendarController"
})
// .when("/expensesList", {
// templateUrl:"views/expensesList.html",
// controller:"listController"
// })
                .otherwise({
                  redirectTo:'/'
                });
              }]);

  app.config(function ($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.put['Content-Type'] =  'application/json';
  $httpProvider.defaults.headers.post['Content-Type'] =  'application/json';
  $httpProvider.defaults.headers.delete = {};
  $httpProvider.defaults.headers.patch = {};
  $httpProvider.defaults.headers.options = {};
});
