angular.module("myApp.filters", []).
filter('getFromList', function() {
  return function(arr) {
  var arr1 = [];
  var expense=0;
  angular.forEach(arr, function(item, index) {
    if(!item['income']) {
      expense += item['value'];
    }
  });
  //console.log('income:'+income);
  angular.forEach(arr, function(item, index) {
    if(!item['income']) {
      item['percent'] = (item['value']/expense).toFixed(2);
      arr1.push(item);
    }
  });
    return arr1;
  }
}).

filter('monthlyRecord', function() {
  return function(arr) {
    var arr1 = arr.reduce(function(o, cur) {
      // Get the index of the key-value pair.
      var occurs = o.reduce(function(n, item, i) {
        return (item.name === cur.name) ? i : n;
      }, -1);
      // If the name is found,
      if (occurs >= 0) {
        // append the current value to its list of values.
        o[occurs].value = parseInt(o[occurs].value) + parseInt(cur.value);

      // Otherwise,
      } else {

        // add the current item to o (but make sure the value is an array).
        var obj = {name: cur.name, value: cur.value, img:cur.img,
        income:cur.income};
        o = o.concat([obj]);
      }
      //console.log('o after concat:'+JSON.stringify(o));
      return o;
    }, []);
    return arr1.sort(function(a,b) {
      return b.value-a.value;
    });
  }
}).
filter('getExpensesTot', function() {
  return function(arr) {
    var arr1 = arr.map(function(item) {
      if(!item.income) {
        return item.value;
      } else {
        return 0;
      }
    })
    .reduce(function(a,b) {
      return a+b;
    });
    return arr1;
  }
})
.filter('getIncomeTot', function() {
  return function(arr) {
    var arr1 = arr.map(function(item) {
      if(item.income) {
        return item.value;
      } else {
        return 0;
      }
    })
    .reduce(function(a,b) {
      return a+b;
    });
    return arr1;
  }
});
