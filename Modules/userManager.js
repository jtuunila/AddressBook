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
emailAddress: String,
addresses: []
});

// Luo malli
var user = mongoose.model("user", userSchema);

// Create user function
exports.createUser = function(req, res){
    
  
  console.log('createUser called');
    // luo data objekti
    var tmpUser = new user({
       userName: req.body.username,
       password: req.body.password,
       emailAddress: req.body.email,
       addresses: []
    });
  
  console.log(tmpUser);
    
  tmpUser.save(function(err){
  
  if(err){
    console.log('user not saved');
    // res.render('myError', {});
  }
  else{
    console.log('user saved succesfully');
    res.redirect('/');  
  }
        
  });
    
   
}


// List users
exports.getUsers = function(req, res){
    console.log('getUsers called');
    
  user.find(function(err, data){
    if (err){
        console.log('Unable to load users');
    }
    else{
        console.log(data);
          res.render('index',{user_data:data});
    }
    });
    }

// Handle login event
exports.login = function(req, res){
  console.log('login started'); 
  var username = req.body.userName;
  var password = req.body.password
  user.find({userName: username}, function(err, data){
   console.log(data[0].password); 
    if (password == data[0].password ){
    console.log('login ok'); 
    //res.redirect('/');
  }
  else{
  console.log('login not ok'); 
    //res.redirect('/');
  }
  });
  /*
  if (password == data[0].password ){
    console.log('login ok'); 
    //res.redirect('/');
  }
  else{
  console.log('login not ok'); 
    //res.redirect('/');
  }
  */

}
