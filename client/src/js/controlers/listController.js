angular.module("myApp.controllers",[])
        .controller("listController", ["$rootScope","$scope","$filter","$interval", "Expenses", "recordsByDate",
        "recordsByPeriod","_",
        function($rootScope, $scope, $filter,$interval, Expenses, recordsByDate, recordsByPeriod,_) {

$rootScope.date = new moment().format("MMMM-YYYY");
$scope.loaded = false;
var begin = moment().format("YYYY-MM-01");
var end = moment().format("YYYY-MM-") + moment().daysInMonth();

recordsByPeriod.query({'date1':begin, 'date2':end}).$promise.then(function(data) {
  $scope.records = $filter('monthlyRecord')(data);
  console.log('records:'+JSON.stringify($scope.records));
  $scope.labels = $filter('getFromList')($scope.records);
  console.log('labels:'+JSON.stringify($scope.labels));
  $scope.totalExpenses = $filter('getExpensesTot')($scope.records);
  $scope.totalIncome = $filter('getIncomeTot')($scope.records);
  $scope.balance = $scope.totalIncome - $scope.totalExpenses;

  $scope.options = {
            chart: {
                type: 'pieChart',
                height: 350,
                donut: true,
                x: function(d){return d.name;},
                y: function(d){return d.percent;},
                // showLabels: true,
                showValues:false,
                showLegend: true,
                pie: {
                  startAngle: function(d) { return d.startAngle -Math.PI },
                  endAngle: function(d) { return d.endAngle-Math.PI }
                },
                labelType: 'percent',
              //      valueFormat: function(d) {
              //   return d3.format('%')(d);
              // },
                duration: 500
                // legend: {
                //     margin: {
                //         top: 5,
                //         right: 140,
                //         bottom: 5,
                //         left: 0
                //     }
                // }
            }
        };
    $scope.data = $scope.labels;

    $interval(function(){
      $scope.loaded = true;
    }, 2000);


});


  }]);
