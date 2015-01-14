var mongoose = require('mongoose');

var uri = "mongodb://localhost/user";

//Check if we can connect to mongodb...
mongoose.connect(uri,function(err,succ){
    if(err){
        console.log("Error: " + err);
    }
    else{
        console.log("Nicely connected to " + uri);
    }
});

// Luo schema
var uSchema = mongoose.Schema;

var userSchema = new uSchema({
userName: {type:String, index:{unique:true}},
password: String,
emailAddress: String
});

// Luo malli
var user = mongoose.model("user", userSchema);

// Create user function
/*
exports.createUser = function(req, res){
    console.log('createUser called');
    
    var tmpUser = new userSchema({
       userName: req
    });
    
   */ 
}