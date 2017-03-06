angular.module("myApp.controllers")
.controller("expensesController",["$scope","$filter","$uibModal", "$log", "Expenses","Records",
"recordsByDate","messages",
 function($scope, $filter, $uibModal, $log, Expenses, Records, recordsByDate, messages) {
var $ctrl = this;
$ctrl.ok = false;
$ctrl.ok1 = false;

$ctrl.removeExpense = function (expense) {
  if(expense) {
  expense.$remove();
    for(var i in $ctrl.expenses) {
      if($ctrl.expenses [i] === expense) {
        $ctrl.expenses.splice(i,1);
      }
    }
} else {
  $ctrl.expenses.$remove(function(){
    console.log('expense is removed');
  });
}
};

$ctrl.updateExpense = function() {
var expense = $scope.expense;
expense.$update(function() {
  console.log('expense id updated:'+expense._id);
}, function(errorResponse) {
  $ctrl.error = errorResponse.data.message;
});
};

$ctrl.findExpense = function() {
$ctrl.expenses = Expenses.query();
};

$ctrl.findExpense();

$ctrl.findOneExpense = function(id) {
$ctrl.expense = Expenses.get({expenseId:id});
};

$ctrl.result = '';
$ctrl.myFunction = function(id) {
    $ctrl.ok = true;
    $ctrl.result = $ctrl.result+id;
  };

  $ctrl.delete = function() {
    $ctrl.result='';
  };

//Modal window and controller
  $ctrl.animationsEnabled = true;
   $ctrl.open = function (size, parentSelector) {
     var parentElem = parentSelector ?
       angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
     var modalInstance = $uibModal.open({
       animation: this.animationsEnabled,
       templateUrl: '../../views/expensesList.html',
       controller: function ($rootScope, $scope, $uibModalInstance, items) {
         $scope.items = items;
         $scope.selected = {
           item:''
         };
         $scope.ok = function () {
           console.log('button is clicked!');
           $uibModalInstance.close($scope.selected.item);
           $rootScope.$broadcast('selectedExpences', {selectedItem:$scope.selected.item});
           console.log('$scope.selected.item:'+JSON.stringify($scope.selected.item));
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
     $ctrl.selectedExpense = selectedItem;
     $ctrl.ok1 = true;
   }, function () {
     $log.info('Modal dismissed at: ' + new Date());
   });
 };

 $ctrl.createRecord = function() {
   var record = new Records({
     name:$ctrl.selectedExpense.name,
     value:$ctrl.result,
     img:$ctrl.selectedExpense.img,
     income:$ctrl.selectedExpense.income,
     createdAt:new Date().toJSON().slice(0,10)
   });
   console.log('record:'+JSON.stringify(record));
   record.$save(function(response) {
     console.log('record is saved!');
     $ctrl.result='';
     $ctrl.ok = false;
     messages('add');
   }, function(errorResponse) {
     $ctrl.error = errorResponse;
   });
 };

 $ctrl.updateRecord = function() {
 var record = $ctrl.record;
 record.$update(function() {
   console.log('record id updated:'+record._id);
 }, function(errorResponse) {
   $ctrl.error = errorResponse.data.message;
 });
 };

 $ctrl.findByDate = function(createdAt) {
 $ctrl.records = Records.query({'createdAt':createdAt});
 };

$ctrl.saveUpdateRecords = function(name) {
  var arr=[];
  recordsByDate.query({'createdAt':new Date().toJSON().slice(0,10)}).$promise.then(function(data) {
    $ctrl.records = data;
    console.log('$ctrl.records:'+$ctrl.records.length);
    console.log('$ctrl.records:'+JSON.stringify($ctrl.records));
    //if record exists update it!
      if($ctrl.records.length !== 0) {
        console.log('records is empty');
        arr = $ctrl.records.filter(function(item, i) {
          var exist = false;
          if(item.name === $ctrl.selectedExpense.name) {
               exist = true;
          }
            return exist;
        });
      if(arr.length !== 0) {
        arr[0].value += parseInt($ctrl.result);
        var record = new Records({
          _id:arr[0]._id,
          name:arr[0].name,
          value:arr[0].value,
          img:arr[0].img,
          income:arr[0].income,
          createdAt:new Date().toJSON().slice(0,10)
        });
        console.log('record:'+JSON.stringify(record));
        record.$update(function(response) {
          console.log('record is updated!');
          $ctrl.result='';
          $ctrl.ok = false;
          messages('update');
        }, function(errorResponse) {
          $ctrl.error = errorResponse;
        });
      } else {
         //if record does not exist save new record in dbelse {
        $ctrl.createRecord();
      }
    }
       //if record does not exist save new record in db
          else {
            $ctrl.createRecord();
          }
  });
}




 }]);
