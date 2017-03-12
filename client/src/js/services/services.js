var services=angular.module("myApp.services",["ngResource"]);

services.factory("Expenses", function($resource) {
  return $resource('/expenses/:expensesId',
  {expensesId:'@expensesId'},
  { update: {
    method:'PUT'
  }
});
});

services.factory("Incomes", function($resource) {
  return $resource('/incomes/:incomesId',
  {incomesId:'@incomesId'},
  { update: {
    method:'PUT'
  }
});
});

services.factory("Records", function($resource) {
  return $resource('/records/:recordsId',
  {recordsId:'@recordsId'},
  { update: {
    method:'PUT'
  }
});
});

services.factory("recordsByDate", function($resource) {
  return $resource('/records/bydate/:createdAt',
  {createdAt:'@createdAt'}
);
});

services.factory("recordsByPeriod", function($resource) {
  return $resource('/records/month/:date1/:date2',
  {date1:'@date1', date2:'@date2'}
);
});

///records/bydate/:createdAt

// .factory('Notify', ['$rootScope',function($rootScope) {
//   var notify = [];
//   notify.sendMsg = function(msg, data) {
//     data = data || {};
//     $rootScope.$emit(msg, data);
//     console.log('message sent!');
//   };
//
//   notify.getMsg = function(msg, func, scope) {
//     var unbind = $rootScope.$on(msg,func);
//     if(scope) {
//       scope.$on('destroy', unbind);
//     }
//   };
// }]);

services.factory("messages",["growl",function(growl) {
          return function(type) {
  var config = {};
  switch (type) {
    case "success":
      growl.success("Done!!!", config);
      break;
      case "add":
      growl.info("Record is added!", config);
      break;
      case "update":
      growl.info("Record is updated! ", config);
      break;
      default:
      growl.error("Pojawił się błąd, sprobuj ponownie!!!", config);
  }
};
}]);

services.factory('shareObjects', function() {
  var objList = [];

  var addObject = function(obj) {
     objList = [];
     objList.push(obj);
  }

  var getObject = function() {
    return objList;
  }

  var deleteObject = function() {
    objList = [];
  }

  return {
    addObject:addObject,
    getObject:getObject,
    deleteObject:deleteObject
  }


});

