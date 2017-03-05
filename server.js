var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var Expense = require('./Models/Expense.js');
var Income = require('./Models/Income.js');
var Record = require('./Models/Record.js');


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on port " + port);
});

app.use(express.static(__dirname+'/client/src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(multer({ dest: './uploads/' }));


console.log("__dirname:"+__dirname);
app.use(express.static(path.join(__dirname, 'client')));

// /* GET home page. */
 app.get('/', function(req, res, next) {
   //Path to your main file
   res.status(200).sendFile(path.join(__dirname+'../client/src/index.html'));
 });


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if ('OPTIONS' === req.method) {
  res.send(200);
}
else {
  next();
}

});

mongoose.connect('mongodb://petar:admin@ds157799.mlab.com:57799/budgetifydb');

app.get('/expenses', function(req, res) {
  Expense.find({}).exec(function(err, expenses) {
    if(err) {
      res.send('error:'+err);
    } else {
      console.log('expense:'+JSON.stringify(expenses));
      res.json(expenses);
    }
  });
});

app.get('/incomes', function(req, res) {
  Income.find({}).exec(function(err, incomes) {
    if(err) {
      res.send('error:'+err);
    } else {
      console.log('incomes:'+JSON.stringify(incomes));
      res.json(incomes);
    }
  });
});

app.get('/records/bydate/:createdAt',function(req, res) {
  //console.log("date:"+JSON.stringify(new Date(req.params.prodData)));
  Record.find({"createdAt":{"$gte":+new Date(req.params.createdAt)}}).exec(function(err, record) {
    if(err) {
      res.send('error has occured:'+err);
    } else {
      console.log('record:'+JSON.stringify(record));
      if(record.length !== 0) {
          res.json(record);
      } else {
        res.json([record]);
      }

      }
  })
});

app.get('/records/month/:date1/:date2',function(req, res) {
  console.log('date1:'+req.params.date1);
  console.log('date2:'+req.params.date2);
  Record.find({'createdAt':{"$gte":req.params.date1,
  "$lt":req.params.date2}}).exec(function(err, records) {
    if(err) {
      res.send('error has occured');
    } else {
      console.log(JSON.stringify(records));
      res.json(records);
    }
  })
});

app.post('/records', function(req,res) {
  var newRecord = new Record();
//  console.log("post:"+JSON.stringify(req.body));
  newRecord.name = req.body.name;
  newRecord.value = req.body.value;
  newRecord.income = req.body.income;
  newRecord.img = req.body.img;
  newRecord.createdAt = req.body.createdAt;
  newRecord.save(function(err,record) {
    if(err) {
      res.send("error");
    } else {
      console.log('record:'+JSON.stringify(record));
      res.send(record);
    }
  });
});

app.put('/records', function(req,res) {
  console.log("put:"+JSON.stringify(req.body));
  Record.findOneAndUpdate({
    _id:req.body._id
  }, req.body, function(err, record) {
    console.log('dailyRecords:'+record);
      res.send(record);
      }
    );
});
