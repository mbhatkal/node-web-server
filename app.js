const port = process.env.PORT || 3000; // note capital PORT
console.log(`Running our Express Web Server port = ${port}`);
// if process.env.port does not exist
const express = require('express'); // loaded express
// To handle meta data in <head> we need express.Router()
const hbs = require('hbs');
const cache = {
temperature:"24" + '°C', 
humidity: "48%"};

const customer = {
  name:"Mahesh",
  age:56,
  city:["Mumbai","Bangalore","Delhi"]
};

var app = express(); // create the web server application
app.use(express.static('public')); // all html files in static directory
app.set('view_engine','hbs');
app.listen(port); // wait for a connection from a browser

//An example middleware  for current date
var requestTime = function (req, res, next) {
  // The passed variable is requestTime and Month is from 0 hence +1
  var today = new Date();
  var date = today.getDate() + '-'+ (today.getMonth()+1) +'-'+today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  req.requestTime = date + '-' + time;
  next()
}

//The middleware is called before the request
app.use(requestTime);
// we now process the http request

//The routes for the website
app.get('/',(req,res) =>{ // respond to the get root request
  console.log('Inside Home page');
  var respFooter ="ADM Web Server Version 1.0 - "
  respFooter += req.requestTime;
  res.render('index.hbs',{
    title:'ADM Home Page',
    pageHeading:'Home Page',
    footer:respFooter,
    //The navigation links
    href1:'/',
    refInfo1:'Home',
    href2:'/Temperature',
    refInfo2:'Temperature',
    href3:'/Customer',
    refInfo3:'Customer',
    href4:'/About',
    refInfo4:'About',
    href5:'/Help',
    refInfo5:'Help'
  });
});

app.get('/Temperature',(req,res) =>{ // respond to the get Temperature request
  console.log('Inside Temperature page');
  var respFooter ="ADM Web Server Version 1.0 - ";
  var respTemperature = "ADM Global Temperature = ";
  respTemperature += cache.temperature;
  respFooter += req.requestTime;
   pageHeading:'Global Temperature Page',
  res.render('index.hbs',{
    title:'ADM Global Temperature Page',
    pageHeading:respTemperature,
    footer:respFooter,
    //The Navigation link
    href1:'/',
    refInfo1:'Home',
    href2:'/Temperature',
    refInfo2:'Temperature',
    href3:'/Customer',
    refInfo3:'Customer',
    href4:'/About',
    refInfo4:'About',
    href5:'/Help',
    refInfo5:'Help'
  });
});

app.get('/about',(req,res) =>{ // respond to the get about request
  console.log('Inside About page');
  var respFooter ="ADM Web Server Version 1.0 - "
  respFooter += req.requestTime;
  res.render('index.hbs',{
    title:'ADM About Page',
    pageHeading:'About Page',
    footer:respFooter,
    href1:'/',
    refInfo1:'Home',
    href2:'/Temperature',
    refInfo2:'Temperature',
    href3:'/Customer',
    refInfo3:'Customer',
    href4:'/About',
    refInfo4:'About',
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
    href4:'/About',
    refInfo4:'About',
    href5:'/Help',
    refInfo5:'Help'
  });
});

app.get('/Customer',(req,res) =>{ // respond to the get root request
console.log('Inside customer page');
res.send(customer);
});

// for all the routes which are not defined
app.use(function (req, res, next) {
  console.log('Inside Unknown page');
  res.status(404).send('Page Not Found');
})

console.log('Server up and Running');
