var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');
var MongoClient = require('mongodb').MongoClient;
const indexRoutes = require('./routes/index');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

 app.use('/', indexRoutes);
 app.use('/login', indexRoutes);

 //var url = "mongodb://localhost:27017/mydb";
 app.post('/signup', (req,res) => {
   console.log(req.body);
   MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
  var dbo = db.db("mydb");
  //var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("userDetails").insertOne(req.body, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
  });
   res.json("data stored");
 });

 app.post('/userLogin', (req,res) => {
   console.log(req.body);
   MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { email: req.body.userName };
    dbo.collection("userDetails").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.json(result);
    });
  }); 
 })

 app.get('/Category', (req,res) =>{
  res.sendFile(path.resolve('public/Category .html'));
 });

 app.get('/reservation', (req,res) =>{
  res.sendFile(path.resolve('public/traindt.html'));
 });

 app.get('/payment', (req,res) =>{
  res.sendFile(path.resolve('public/payment.html'));
 });

 app.get('/passengerdetails', (req,res) =>{
  res.sendFile(path.resolve('public/Passenger details.html'));
 })


 var url = "mongodb://localhost:27017/";

 app.post('/trainDetails',(req,res) =>{
  var myobj = [
    { name: 'Chennai Express', source: 'chennai', destination: 'tuticorin', seats: 600, lowerBerth: 200, middleBerth: 200, upperBerth: 200},
    { name: 'Nagercoil Express', source: 'chennai', destination: 'nagercoil',seats: 600, lowerBerth: 200, middleBerth: 200, upperBerth: 200},
    { name: 'Kaveri Express', source: 'chennai', destination: 'bangalore',seats: 600, lowerBerth: 200, middleBerth: 200, upperBerth: 200}
    // { name: 'Hannah', seats: 600, lowerBerth: 200, middleBerth: 200, upperBerth: 200},
    // { name: 'Michael', seats: 600, lowerBerth: 200, middleBerth: 200, upperBerth: 200},
    // { name: 'Sandy', seats: 600, lowerBerth: 200, middleBerth: 200, upperBerth: 200}
    //{ name: 'Chennai Express', source: 'chennai', destination: 'tuticorin', ac_3_tier: {seats: 300, lowerBerth: 100, middleBerth: 100, upperBerth: 100}, sleeper:{seats: 400, lowerBerth: 200, middleBerth: 200, upperBerth: 200}
  ]
  var url1 = "mongodb://localhost:27017/traindb";
  MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
    //**************** */
    //if (err) throw err;
    //console.log("Database created!");
    //********************** */

    //******************* */
    // var dbo = db.db("traindb");
    // dbo.createCollection("trainDetails", function(err, res) {
    //   if (err) throw err;
    //   console.log("Collection created!");
    //************************* */
    
    if (err) throw err;
    var dbo = db.db("traindb");
    dbo.collection("trainDetails").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  }); 
 });

 app.post('/getpnrdetails', async (req,res) => {
   console.log(req.body.pnr);
   var obj = {pnr: req.body.pnr, status: "confirmed"};
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

await MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("pnrdb");
  dbo.collection("pnrDetails").insertOne(obj, function(err, result) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
    res.json({success:'ok'});
  });
  
});

 });
 app.post('/logDetails',(req,res) =>{
  var url1 = "mongodb://localhost:27017/";
  MongoClient.connect(url1,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
    //******************** */
    // if (err) throw err;
    // console.log("Database created!");
    //*********************** */

    //************************ */
    // var dbo = db.db("mydb");
    // dbo.createCollection("userDetails", function(err, res) {
    //   if (err) throw err;
    //   console.log("Collection created!");
    //****************************** */
    var dbo = db.db("pnrdb");
    dbo.createCollection("pnrDetails", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");

      db.close();
    });
  }); 
 });

 app.post('/trainSearch',(req,res) =>{
   console.log(req.body);
   MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },function(err, db) {
    if (err) throw err;
    var dbo = db.db("traindb");
    var query = { source: req.body.source, destination: req.body.destination };
    dbo.collection("trainDetails").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.json(result);
    });
  }); 
 });
// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/public/index.html'));
//   //__dirname : It will resolve to your project folder.
// });
// app.get('/route',function(req,res){
//   res.sendFile(path.join(__dirname+'/public/route.html'));
//   //__dirname : It will resolve to your project folder.
// });
// app.listen('3003', function(){
//   console.log('running on port 5000');
// });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
