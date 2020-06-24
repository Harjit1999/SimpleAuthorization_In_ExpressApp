var passport=require('passport');
var localStrategy=require('passport-local').Strategy;
var User=require('./userSchema');
var bcrypt=require('bcrypt');
passport.use(new localStrategy(function(username,password,done){
        User.findOne({username:username},function(err,user){
            if(err){
            return done(err);
            }
           if(!user)
           {    console.log("userdoes not exist");
               return done(null,false,{message:"user does not exist"});
               
           }
           if(bcrypt.compareSync(password,user.password)){
                console.log("correct password");
                return done(null,user);
               
           }
           console.log("incorrect pasword");
           return done(null,false,{message:"incorrect password"});
           
        });
    
}));
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(null, user); 
    });
  });
module.exports=localStrategy;