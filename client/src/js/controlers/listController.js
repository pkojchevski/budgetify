angular.module("myApp.controllers",[])
        .controller("listController", ["$rootScope","$scope","$filter","$interval", "$location",
        "Expenses", "recordsByDate", "recordsByPeriod", 'shareObjects', 'ngAudio',
        function($rootScope, $scope, $filter,$interval,$location, Expenses, recordsByDate, recordsByPeriod, 
          shareObjects, ngAudio) {

$rootScope.date = new moment().format("MMMM-YYYY");
$scope.loaded = false;
var begin = moment().format("YYYY-MM-01");
var end = moment().format("YYYY-MM-") + moment().daysInMonth();
shareObjects.deleteObject();

$scope.audio = ngAudio.load('../../../audio/woosh.wav');
$scope.playSound = function(){
   console.log('button is clicked');
  $scope.audio.play();
}

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


$scope.openItem = function(item) {

  if(item.income) {
    $location.path('/income');

  } else {
    $location.path('/expenses');
  }
  shareObjects.addObject(item);
  
}


  }]);
