const port = process.env.PORT || 3000; // note capital PORT
console.log(`Running our Express Web Server port = ${port}`);
// if process.env.port does not exist
const express = require('express'); // loaded express
// To handle meta data in <head> we need express.Router()
const hbs = require('hbs');
const customer = {
  name:"Mahesh",
  age:56,
  city:["Mumbai","Bangalore","Delhi"]
};

var app = express(); // create the web server application
app.use(express.static('public')); // all html files in static directory
app.set('view_engine','hbs');
app.listen(port); // wait for a connection from a browser
app.get('/',(req,res) =>{ // respond to the get root request
  console.log('Inside Home page');
  res.render('index.hbs',{
    title:'ADM Home Page',
    pageHeading:'Home Page',
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
app.get('/Temperature',(req,res) =>{ // respond to the get root request
  console.log('Inside Temperature page');
  res.render('index.hbs',{
    title:'ADM Global Temperature Page',
    pageHeading:'Global Temperature Page',
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

app.get('/about',(req,res) =>{ // respond to the get root request
  console.log('Inside About page');
  res.render('index.hbs',{
    title:'ADM About Page',
    pageHeading:'About Page',
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
app.get('/help',(req,res) =>{ // respond to the get root request
  console.log('Inside help page');
  res.render('index.hbs',{
    title:'ADM Help Page',
    pageHeading:'Help Page',
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
  res.status(404).send("Sorry can't find that!")
})
console.log('Server up and Running');
