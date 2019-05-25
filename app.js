var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

mongoose.connect("mongodb://localhost:27017/creditApp", {useNewUrlParser: true});
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
//    name: "Deborah",
//    email: "deborah@gmail.com",
//    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu-r0mf-PrHjeq9w1GH1MN6Ju1GM8ZbBlXVZIZe3GP0q6EuYpv",
//    credits: 100
// });  

// Credit.create({
//     name: "Maddy",
//     email: "mad1989L@yahoo.com",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu-r0mf-PrHjeq9w1GH1MN6Ju1GM8ZbBlXVZIZe3GP0q6EuYpv",
//     credits: 100
//  });

app.get("/", function(req, res){
    res.redirect("/credits"); z 
    
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

app.get("/credits/success", function(req,res){
    res.render("success");
})


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



//  app.get("/abc", function(req, res){
//     Credit.find({}, function(err, credits){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("credits", {credits: credits});            
//         }
//     });
// });

 

app.listen("3000", function(){
    console.log("Server has started");
});
