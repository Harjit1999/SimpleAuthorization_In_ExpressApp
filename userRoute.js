var express=require('express');
var router=express.Router();
var User=require("./userSchema");
var passport=require('passport');
var authenticate=require("./authenticate");
var bcrypt=require('bcrypt');

router.get("/",function(req,res){
    res.send("home page");
})
router.get("/fail",function(req,res){
    console.log(req.url,req.method);
    console.log(req.session,req.session.cookie);
    res.send("fail to log in");
})
router.get('/user',function(req,res){
    console.log(req.session.cookie);
    console.log(req.isAuthenticated());
    if(req.isAuthenticated())
    {
        res.send("you are authenticated");  
    }
    else{
        res.send("you are not authenticated");
    }
});
router.post("/signup",function(req,res){
    var pass=genfunction(req.body.password)
   User.insertMany({username:req.body.username,password:pass},function(err,user){
      console.log(req.session.cookie);
       console.log('values inserted');
       res.send(user);
   })
});

router.post("/login",passport.authenticate('local'),function(req,res){
    
            
                console.log("login successfully"+req.user);
                
                res.send(req.user);
    
});
router.get("/login",function(req,res,next){
    res.render("login.ejs");
    next();
})
function genfunction(pwd)
{
    var password=bcrypt.hashSync(pwd,10)
        return password;
}

module.exports=router;
