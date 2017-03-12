angular.module("myApp.controllers")
.controller("incomeController",["$scope","$filter","$uibModal", "$log", "$location", "$timeout", 
  "Incomes","Records", "recordsByDate","messages", "shareObjects",
 function($scope, $filter, $uibModal, $log, $location, $timeout, Incomes, Records, recordsByDate, 
  messages,shareObjects) {

var incomeCtrl = this;
incomeCtrl.ok = false;
incomeCtrl.ok1 = false;
$scope.animated = false;

incomeCtrl.selectedIncome = shareObjects.getObject()[0] || null;
console.log('selectedIncome:'+JSON.stringify(incomeCtrl.selectedIncome));

if(incomeCtrl.selectedIncome) {
  console.log('equals');
  incomeCtrl.ok = true;
  incomeCtrl.ok1 = true;
}

incomeCtrl.removeIncome = function (income) {
  if(income) {
  income.$remove();
    for(var i in incomeCtrl.incomes) {
      if(incomeCtrl.incomes [i] === income) {
        incomeCtrl.incomes.splice(i,1);
      }
    }
} else {
  incomeCtrl.incomes.$remove(function(){
    console.log('income is removed');
  });
}
};

incomeCtrl.updateIncome = function() {
var income = $scope.income;
income.$update(function() {
  console.log('income id updated:'+income._id);
}, function(errorResponse) {
  incomeCtrl.error = errorResponse.data.message;
});
};

incomeCtrl.findIncome = function() {
incomeCtrl.incomes = Incomes.query();
};

incomeCtrl.findIncome();

incomeCtrl.findOneIncome = function(id) {
incomeCtrl.income = Incomes.get({incomeId:id});
};

incomeCtrl.result = '';
incomeCtrl.myFunction = function(id) {
    incomeCtrl.ok = true;
    incomeCtrl.result = incomeCtrl.result+id;
    console.log('button clicked');
  };

  incomeCtrl.delete = function() {
    incomeCtrl.result='';
  };

//Modal window and controller
  incomeCtrl.animationsEnabled = true;
   incomeCtrl.openIncome = function (size, parentSelector) {
     var parentElem = parentSelector ?
       angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
     var modalInstance = $uibModal.open({
       animation: this.animationsEnabled,
       templateUrl: '../../views/incomesList.html',
       controller: function ($rootScope, $scope, $uibModalInstance, items) {
         $scope.items = items;
         $scope.selected = {
           item:''
         };
         $scope.ok = function () {
           console.log('button is clicked!');
           $uibModalInstance.close($scope.selected.item);
      }
       },
       size: size,
       appendTo: parentElem,
       resolve: {
      items: function () {
        console.log('in resolve:'+$scope.items);
        return $scope.items;
      }
    }
     });
     modalInstance.result.then(function (selectedItem) {
     incomeCtrl.selectedIncome = selectedItem;
     incomeCtrl.ok1 = true;
   }, function () {
     $log.info('Modal dismissed at: ' + new Date());
   });
 };

 incomeCtrl.createRecord = function() {
   var record = new Records({
     name:incomeCtrl.selectedIncome.name,
     value:incomeCtrl.result,
     img:incomeCtrl.selectedIncome.img,
     income:incomeCtrl.selectedIncome.income,
     createdAt:new Date().toJSON().slice(0,10)
   });

   record.$save(function(response) {
     console.log('record is saved!');
     incomeCtrl.result='';
     incomeCtrl.ok = false;
     $scope.animated = true;
   }, function(errorResponse) {
     incomeCtrl.error = errorResponse;
   });
 };

 incomeCtrl.updateRecord = function() {
 var record = incomeCtrl.record;
 record.$update(function() {
   console.log('record id updated:'+record._id);
 }, function(errorResponse) {
   incomeCtrl.error = errorResponse.data.message;
 });
 };

 incomeCtrl.findByDate = function(createdAt) {
 incomeCtrl.records = Records.query({'createdAt':createdAt});
 };

incomeCtrl.saveUpdateRecords = function(name) {
  var arr=[];
  recordsByDate.query({'createdAt':new Date().toJSON().slice(0,10)}).$promise.then(function(data) {
    incomeCtrl.records = data;

    //if record exists update it!
      if(incomeCtrl.records.length !== 0) {
        console.log('records is empty');
        arr = incomeCtrl.records.filter(function(item, i) {
          var exist = false;
          if(item.name === incomeCtrl.selectedIncome.name) {
               exist = true;
          }
            return exist;
        });
        if(arr.length !== 0) {
          arr[0].value += parseInt(incomeCtrl.result);
          var record = new Records({
            _id:arr[0]._id,
            name:arr[0].name,
            value:arr[0].value,
            img:arr[0].img,
            income:arr[0].income,
            createdAt:new Date().toJSON().slice(0,10)
          });
          record.$update(function(response) {
            console.log('record is updated!');
            incomeCtrl.result='';
            incomeCtrl.ok = false;
            $scope.animated = true;
            $timeout(function() {
              console.log('list is running');
              $location.path('/list');
            },300);
          }, function(errorResponse) {
            incomeCtrl.error = errorResponse;
          });
        } else {
          $scope.animated = true;
          $timeout(function() {
             console.log('list is running');
              $location.path('/list');
            },300);
          incomeCtrl.createRecord();
        }
      }
       //if record does not exist save new record in db
          else {
            $scope.animated = true;
            $timeout(function() {
               console.log('list is running');
              $location.path('/list');
            },300);
            incomeCtrl.createRecord();
          }
  });
}




 }]);
