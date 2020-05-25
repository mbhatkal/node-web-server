const port = process.env.PORT || 3000; // note capital PORT
console.log(`Running our Express Web Server port = ${port}`);
// if process.env.port does not exist
const express = require('express'); // loaded express
// To handle meta data in <head> we need express.Router()
const hbs = require('hbs');
const request = require('request');
const fs = require('fs');
const path = require('path');

//define a array
// JavaScript objects are containers for named values called properties or methods.
const menu = ["Home","Temperature","Customer","Login","Pdf","Help"];
const product = ["LGLite","TKBase","TKDSP","LGLiteATE"];
var pdfFile = new Array();

const customer = {
  name:"Mahesh",
  city:"Mumbai",
  temperature:"24",
  latitude:"78",
  longitude:"28"};

// WeatherApp support 
let apiKey = '151db84bf12a3993cf793a6540e4a48c';

var app = express(); // create the web server application
//  Using app.use() means that this middleware will be called for every call to the application.
app.use(express.static('public')); // all html files in static directory
app.use(express.static('pdf')); // all pdf files 
app.set('view_engine','hbs');
console.log('Setting userName');
app.listen(port); // wait for a connection from a browser

// Middleware No 001 for current date
var requestTime = function (req, res, next) {
  // The passed variable is requestTime and Month is from 0 hence +1
  var today = new Date();
  var date = today.getDate() + '-'+ (today.getMonth()+1) +'-'+today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  req.requestTime = date + '-' + time;
  next();
}

// Middleware No 002 for login name 

var requestCustomer = function(req,res,next){
  console.log("Inside Customer Middleware");
  console.log(customer.name);
  if(req.query.username == null) {
    console.log("customer == NULL");
    req.requestCustomer = customer.name // $_GET["id"]
  }
  else{
    req.requestCustomer = req.query.username; 
    customer.name = req.requestCustomer;
    console.log(req.requestCustomer);
  };
  console.log(req.requestCustomer);
  next();
}

// Middleware No 0003 for City Temperature
var requestCity = function(req,res,next){
  console.log("Inside Temperature Middleware");
  console.log(customer.city);
  if(req.query.City == null) {
    console.log("City == NULL")
    req.requestCity = customer.city // $_GET["id"]
  }
  else{
    req.requestCity = req.query.City; // Variable names are case sensitive
    customer.city = req.requestCity;
    console.log(req.requestCity);
  };
  console.log(req.requestCity);
  next();
}

//Middleware No 004 for getting Weather Data
var requestWeather = function(req,res,next){
  console.log("Inside Weather Request Middleware");
  console.log(customer.city);
  if(req.query.City == null) {
    console.log("City == NULL")
    req.requestCity = customer.city // $_GET["id"]
  }
  else{
    customer.city = req.query.City; // Variable names are case sensitive
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${customer.city}&units=metric&appid=${apiKey}`;
    request(url, function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // print status code
    let weather = JSON.parse(body);
    customer.temperature = weather.main.temp;
    customer.latitude = weather.coord.lat;
    customer.longitude = weather.coord.lon;
    console.log("Weather data procured");
    });
  };
  console.log(req.requestCity);
  next();
}

//Middleware No 005 for getting PDF File List
var requestPdf = function(req,res,next){
//The application is in __dirname, while the cid = 20000 a number
pdfFile.length = 0; //clear the array before use
const subDir = 'pdf';
const dirPath = path.join(__dirname,subDir);
fs.readdir(dirPath,(err,files) =>{
  if(err){
    console.log(err);
    return; };
    files.forEach( (file) =>{
      pdfFile.push(file);
     });
  });
  console.log(pdfFile);
  next();
};



//The middleware is called before the request
app.use(requestTime);
app.use(requestCustomer);
app.use(requestCity);
app.use(requestWeather);
app.use(requestPdf);
// we now process the http request

//The Homepage routes for the website
app.get('/',(req,res) => {
  console.log("Redirecting to /Home");
  res.redirect('/Home');
});

app.get('/Home',(req,res) =>{ // respond to the get root request
  console.log('Inside Home page');
  var respTitle = "ADM Home Page";
  var respFooter ="ADM Web Server Version 1.0 - ";
  var respHeading = 'Welcome - ' + req.requestCustomer;
  respFooter += req.requestTime;
  res.render('index.hbs',{
    title:respTitle,
    pageHeading:respHeading,
    footer:respFooter,
    //The navigation links
    menu,
    product
  });
});

app.get('/Temperature',(req,res) =>{ // respond to the get Temperature request
  console.log('Inside Temperature page');
  var respTitle = "ADM Global Temperature Page";
  var respFooter ="ADM Web Server Version 1.0 - ";
  var respHeading = "Global Temperature for  ";
  var respCity =req.requestCity; 
  respHeading += customer.city;
  respHeading += " = "
  respHeading += customer.temperature;
  respHeading += " °C";
  respFooter += req.requestTime;
  console.log(respCity);
  res.render('GTemp.hbs',{
    title:respTitle,
    pageHeading:respHeading,
    footer:respFooter,
    refCity:respCity,
    //The Navigation link
    menu
  });
});

//The login page sets the username in customer object
app.get('/Login',(req,res) =>{ // respond to the get the login html page request
  console.log('Inside Login page');
  var respTitle ="Login Page : ";
  var respFooter ="ADM Web Server Version 1.0 - "
  respFooter += req.requestTime;
  var respUserName = req.requestCustomer;
  respTitle += respUserName;
  res.render('Login.hbs',{ // The render html page changes here
    title:respTitle,
    pageHeading:respTitle,
    footer:respFooter,
    refName:respUserName,
    //The Navigation link
    menu
  });
});

//The file list for pdf
app.get('/Pdf',(req,res) => {
  console.log('Inside Pdf reader');
  var respTitle ="PDF Documents Page : ";
  var respFooter ="ADM Web Server Version 1.0 - "
  respFooter += req.requestTime;
  respTitle += "*.pdf";
  res.render('pdf.hbs',{ // The render html page changes here
    title:respTitle,
    pageHeading:respTitle,
    footer:respFooter,
    //The Navigation link
    menu,
    pdfFile
  });
});


app.get('/help',(req,res) =>{ // respond to the get help request
  console.log('Inside help page');
  var respTitle = "ADM Help Page";
  var respFooter ="ADM Web Server Version 1.0 - "
  respFooter += req.requestTime;
  res.render('index.hbs',{
    title:respTitle,
    pageHeading:respTitle,
    footer:respFooter,
    //The Navigation link
    menu
  });
});

app.get('/Customer',(req,res) =>{ // respond to the get root request
console.log('Inside customer page');
res.send(global.customer);
});

// for all the routes which are not defined
app.use(function (req, res, next) {
  console.log('Inside Unknown page');
  res.status(404).send('Page Not Found');
})

console.log('Server up and Running');
