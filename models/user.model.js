const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        maxlength:12,
        required: "Please enter your username"
    },
    password:{
        type: String,
        required: "Please enter your password",
    },
    score:{
        type: Number,
    }
},
 { 
    timestamps: true,

});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(require('mongoose-unique-validator'));
userSchema.plugin(require('mongoose-beautiful-unique-validation'));
const User = mongoose.model('User', userSchema);

module.exports = User;