var express=require('express');
var app=express();
var mongoose=require('mongoose');
var session=require("express-session")
var mongoStore=require('connect-mongo')(session)
var ejs=require('ejs');
var url="mongodb://localhost:27017/mydb";
var connect=mongoose.connect(url,{useNewUrlParser:true});
connect.then(function(db){
    console.log('database connected');
})
var passport=require('passport');
var route=require("./userRoute");
var bodyParser=require('body-parser');
var authenticate=require("./authenticate");
app.set('views','./views');
app.use(session(
   { secret:"secret",
    resave:false,
    saveUninitialized:false,
    store: new mongoStore({
        mongooseConnection:mongoose.connection,
        collection:"sessions"}
        ),
    cookie:{
        maxAge:3000*10,
    }
    
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(passport.initialize());
app.use(passport.session());
app.use(route);
app.listen(4000,function(){
    console.log("server listen ata port 4000 ");
})