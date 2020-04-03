console.log('Running our Express Web Server port 3000');
const express = require('express'); // loaded express
const hbs = require('hbs');
const customer = {
  name:"Mahesh",
  age:56,
  city:["Mumbai","Bangalore","Delhi"]
};

var app = express(); // create the web server application
app.use(express.static('public')); // all html files in static directory
app.set('view_engine','hbs');
app.listen(3000); // wait for a connection from a browser
app.get('/',(req,res) =>{ // respond to the get root request
  res.render('index.hbs',{
    pageHeading:'Home Page',
    href1:'/',
    refInfo1:'Home',
    href2:'/about',
    refInfo2:'About',
    href3:'/help',
    refInfo3:'Help'
  });
});
app.get('/about',(req,res) =>{ // respond to the get root request
  res.render('index.hbs',{
    pageHeading:'About Page',
    href1:'/',
    refInfo1:'Home',
    href2:'/about',
    refInfo2:'About',
    href3:'/help',
    refInfo3:'Help'
  });
});
app.get('/help',(req,res) =>{ // respond to the get root request
  res.render('index.hbs',{
    pageHeading:'Help Page',
    href1:'/',
    refInfo1:'Home',
    href2:'/about',
    refInfo2:'About',
    href3:'/help',
    refInfo3:'Help'
  });
});
app.get('/customer',(req,res) =>{ // respond to the get root request
res.send(customer);
});
// for all the routes which are not defined
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})
console.log('Server up and Running');
