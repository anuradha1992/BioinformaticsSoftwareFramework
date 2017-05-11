var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var interact = require('interact-js');

var fs = require('fs');
//var obj = JSON.parse(fs.readFileSync(__dirname + '/public/json/webservices.json', 'utf8'));
var obj;

fs.readFile(__dirname + '/public/json/webservices.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log(obj);
 });

app.get('/listServices', function (req, res) {
  console.log(obj);
  res.end(JSON.stringify(obj));
})

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});

router.get("/styles/styles.css",function(req,res){
  res.sendFile("/styles/styles.css");
});

app.use("/",router);
app.use(express.static(__dirname + '/public/'));

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});