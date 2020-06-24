var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

var user=mongoose.model('user',userSchema);
module.exports=user;