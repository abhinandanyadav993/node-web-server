const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static((__dirname+ '/public')));
// app.use(express.static('public'))
// app.use('/static', express.static('public'))
// app.use(express.static((__dirname , '/public')))

app.use((req,res,next) => {
  var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
})


hbs.registerHelper('getCurrentYear' , () => {
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt' ,(text) => {
  return text.toUpperCase();
})
app.get('/', (req, res)=>{
 // res.send('Hello Word!');
 res.send({
   name: 'abhinandan',
   likes:['Bikes', 'Cars']
 })
})


app.get('/about' ,(req,res) => {
  res.render('about.hbs' , {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
})

app.get('/home' ,(req,res) => {
  res.render('home.hbs' , {
    pageTitle: 'Home Page',
  WelcomeMesage: 'welcome to my website.'
  });
})


app.get('/bad', (req,res) => {
  res.send({
    errormessage: 'Unable to handel request'
  })
})


app.listen(3000, () => console.log('app running on 3000 port!'));
