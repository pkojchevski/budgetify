angular.module("myApp.directives",[]).
directive('expensesList', function() {
  return {
    restrict:'E',
    transclude:true,
    templateUrl:'../../views/expenses.html',
    link:function(scope, elem, attr) {

  }
}
});
