var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
name: {type:String, required:true},
income:{type:Boolean, required:true},
img:{type:String, required:true}


});

var Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;
