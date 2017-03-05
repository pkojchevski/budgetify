var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema({
name: {type:String, required:true},
createdAt: {type: Date},
value: {type:Number, required:true, trim:true},
income:{type:Boolean, required:true},
img:{type:String, required:true}
});

var Record = mongoose.model('Record', RecordSchema);

module.exports = Record;
