angular.module("myApp.filters", []).
filter('getFromList', function() {
  return function(arr) {
  var arr1 = [];
  var income=0;
  angular.forEach(arr, function(item, index) {
    if(item['income']) {
      income += item['value'];
    }
  });
  console.log('income:'+income);
  angular.forEach(arr, function(item, index) {
    if(!item['income']) {
      item['percent'] = (item['value']/income).toFixed(2);
      arr1.push(item);
    }
  });
    return arr1;
  }

});
