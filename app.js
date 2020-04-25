const port = process.env.PORT || 3000; // note capital PORT
console.log(`Running our Express Web Server port = ${port}`);
// if process.env.port does not exist
const express = require('express'); // loaded express
// To handle meta data in <head> we need express.Router()
const hbs = require('hbs');
const cache = {
temperature:"24" + '°C', 
humidity: "48%"};

//define a array
// JavaScript objects are containers for named values called properties or methods.
const customer = {
  name:"Mahesh",
  age:56,
  city:["Mumbai","Bangalore","Delhi"]
};


var app = express(); // create the web server application
app.use(express.static('public')); // all html files in static directory
app.set('view_engine','hbs');
console.log('Setting userName');
app.listen(port); // wait for a connection from a browser

//Two examples of middleware  for current date
var requestTime = function (req, res, next) {
  // The passed variable is requestTime and Month is from 0 hence +1
  var today = new Date();
  var date = today.getDate() + '-'+ (today.getMonth()+1) +'-'+today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  req.requestTime = date + '-' + time;
  next();
}

//This is a middleware and runs before the request

var requestCustomer = function(req,res,next){
  console.log("Inside Middleware");
  console.log(customer.name);
  if(req.query.username == null) {
    req.requestCustomer = customer.name // $_GET["id"]
  }
  else{
    req.requestCustomer = req.query.username; 
    customer.name = req.requestCustomer;
  };
  console.log(req.requestCustomer);
  next();
}

//The middleware is called before the request
app.use(requestTime);
app.use(requestCustomer);

// we now process the http request

//The routes for the website
app.get('/',(req,res) =>{ // respond to the get root request
  console.log('Inside Home page');
  var respFooter ="ADM Web Server Version 1.0 - ";
  var respHeading = 'Welcome - ' + req.requestCustomer;
  respFooter += req.requestTime;
  res.render('index.hbs',{
    title:'ADM Home Page',
    pageHeading:respHeading,
    footer:respFooter,
    //The navigation links
    href1:'/',
    refInfo1:'Home',
    href2:'/Temperature',
    refInfo2:'Temperature',
    href3:'/Customer',
    refInfo3:'Customer',
    href4:'/Login',
    refInfo4:'Login',
    href5:'/Help',
    refInfo5:'Help'
  });
});

app.get('/Temperature',(req,res) =>{ // respond to the get Temperature request
  console.log('Inside Temperature page');
  var respFooter ="ADM Web Server Version 1.0 - ";
  var respHeading = "ADM Global Temperature = ";
  respHeading += cache.temperature;
  respFooter += req.requestTime;
  res.render('index.hbs',{
    title:'ADM Global Temperature Page',
    pageHeading:respHeading,
    footer:respFooter,
    //The Navigation link
    href1:'/',
    refInfo1:'Home',
    href2:'/Temperature',
    refInfo2:'Temperature',
    href3:'/Customer',
    refInfo3:'Customer',
    href4:'/Login',
    refInfo4:'Login',
    href5:'/Help',
    refInfo5:'Help'
  });
});

//The login page sets the username in customer object
app.get('/Login',(req,res) =>{ // respond to the get the login html page request
  console.log('Inside Login page');
  var respFooter ="ADM Web Server Version 1.0 - "
  respFooter += req.requestTime;
  var respUserName = req.requestCustomer;
  app.set("userName",respUserName);
  console.log(respUserName);
  res.render('Login.hbs',{ // The render html page changes here
    title:'ADM Login Page',
    pageHeading:'Login Page',
    footer:respFooter,
    refName:respUserName,
    href1:'/',
    refInfo1:'Home',
    href2:'/Temperature',
    refInfo2:'Temperature',
    href3:'/Customer',
    refInfo3:'Customer',
    href4:'/Login',
    refInfo4:'Login',
    href5:'/Help',
    refInfo5:'Help'
  });
});

app.get('/help',(req,res) =>{ // respond to the get help request
  console.log('Inside help page');
  var respFooter ="ADM Web Server Version 1.0 - "
  respFooter += req.requestTime;
  res.render('index.hbs',{
    title:'ADM Help Page',
    pageHeading:'Help Page',
    footer:respFooter,
    href1:'/',
    refInfo1:'Home',
    href2:'/Temperature',
    refInfo2:'Temperature',
    href3:'/Customer',
    refInfo3:'Customer',
    href4:'/Login',
    refInfo4:'Login',
    href5:'/Help',
    refInfo5:'Help'
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
