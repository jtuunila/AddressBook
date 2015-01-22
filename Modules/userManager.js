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
var Schema = mongoose.Schema;

var userSchema = new Schema({
userName: {type:String, index:{unique:true}},
password: String,
emailAddress: String
});

var addressSchema = new Schema({
    owner:String,
    name:String,
    address:String,
    email:String,
});


// Luo malli käyttäjälle
var user = mongoose.model("user", userSchema);
// Luo malli osoitteelle
var address = mongoose.model("address", addressSchema);

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
    console.log(err);
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
  user.find({userName: req.body.userName, password:req.body.password}, function(err,data)   {
      if (err || data.length == 0){
          console.log('login nok'); 
          res.render('index', {status:'Incorrect login data'});
      }
      else{
      console.log('login ok');
       console.log(req.body.userName);
       console.log(data[0].userName);
      req.session.logged = true;
      req.session.username = data[0].userName;
      res.redirect('/viewAddresses');
          
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

exports.showAddAddress = function(req, res){
     if(req.session.logged){
        res.render('addaddress')
        //queries.getDataForUser(req,res);
    }
    else{
        res.render('index',{status:'Relog to application'});
    }   
}

exports.saveAddress = function(req, res){
    
    console.log('saveAddress called');
    var tempAddress = new address({
        owner:req.session.username,
        name:req.body.name,
        address:req.body.address,
        email:req.body.email
    });
    
    tempAddress.save(function(err){
        if(err){
            console.log('error' + err)
            res.render('addAddress',{error:'Could not save contact in database'});
        }
        else{
            console.log('address saved successfully')
            //res.render('addresses',{username:req.session.username});
            res.redirect('/viewAddresses');
        }
    });
}


exports.getUserAddresses = function(req,res){
    console.log('getUserAddresses called');
    if(req.session.logged){
    console.log('Session OK');
    address.find({owner:req.session.username},function(err,data){
      if(err){
        console.log('error fetching user data');
        res.render('error');
      }
      else{
        console.log(data);
        res.render('addresses',{username:req.session.username,addresses:data});
      }
    });
    }
  else{
  console.log('Session NOK');
  res.redirect('/');  
  }
    
}

exports.getContactInfo = function(req,res){
  console.log('getContactInfo called');
  if(req.session.logged){
    console.log('Session OK');
    address.findById(req.query.id,function(err,data){
    if(err){
      res.render('error');
    }
    else{
      res.render('showUser',{username:req.session.username, mydata:data});
    }
    });
  }
  else
  {
    console.log('Session NOK');
    res.redirect('/');
  }
}

exports.logout = function(req,res){
    req.session.destroy();
    res.status(301);
    res.setHeader('location','/');
    res.render('index',{title:'Login',error:''});
}


