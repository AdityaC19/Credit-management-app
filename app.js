var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

mongoose.connect("mongodb+srv://aditya:aditya@cluster0-wim3x.mongodb.net/test?retryWrites=true", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use("/public", express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

var creditSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    credits: Number
});

var Credit = mongoose.model("Credit", creditSchema);

// Credit.create({
//    name: "John",
//    email: "john@gmail.com",
//    image: "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1",
//    credits: 100
// });  



app.get("/", function(req, res){
    res.render("index"); 
    
});

//INDEX ROUTE
app.get("/credits", function(req, res){
    Credit.find({}, function(err, credits){
        if(err){
            console.log(err);
        } else {
            res.render("credits", {credits: credits});            
        }
    });
});

//SUCCESS ROUTE
app.get("/credits/transfer/:id", function(req,res){
    Credit.findById(req.params.id, function(err, credits){
       res.render("success");
    }); 
});



//TRANSFER ROUTE
app.get("/credits/transfer", function(req, res){
    Credit.find({}, function(err, transferCredits){
        if(err){
            res.redirect("/credits");
        } else {
            res.render("transfer", {credits: transferCredits});
        }
   }); 
});


//SHOW ROUTE
app.get("/credits/:id", function(req, res){
    Credit.findById(req.params.id, function(err, credits){
         if(err){
             res.redirect("/credits");
         } else {
             res.render("show", {credit: credits});
         }
    }); 
 });

app.listen("3000", function(){
    console.log("Server has started");
});
