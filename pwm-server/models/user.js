const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name:{type:String, required:true, unique:true},
    password:{type:String, required:true, unique:true},
    favorites:{type:Array}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Users', userSchema);