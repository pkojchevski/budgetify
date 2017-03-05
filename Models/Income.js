var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IncomeSchema = new Schema({
name: {type:String, required:true},
income:{type:Boolean, required:true},
img:{type:String, required:true}
});

var Income = mongoose.model('Income', IncomeSchema);

module.exports = Income;
