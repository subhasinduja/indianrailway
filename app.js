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

 app.get('/tamil', (req,res) =>{
  res.sendFile(path.resolve('public/category.html'));
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

app.post('/cancelpnr', async (req,res) => {
  console.log(req.body.pnr);
  var obj = {pnr: req.body.pnr};
  var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

await MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
 if (err) throw err;
 var dbo = db.db("pnrdb");
 var newObj = {$set: {status: "cancelled"}};
 dbo.collection("pnrDetails").updateOne(obj, newObj, function(err, result) {
   if (err) throw err;

   console.log(result);
   console.log("1 document updated");
   db.close();
   res.json({success:'ok'});
 });
 
});
});

 app.post('/logDetails',(req,res) =>{
   console.log(req.body.pnr);
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
    // var dbo = db.db("pnrdb");
    // dbo.createCollection("pnrDetails", function(err, res) {
    //   if (err) throw err;
    //   console.log("Collection created!");

    //   db.close();
    // });
    if (err) throw err;
    var dbo = db.db("pnrdb");
    var query = { pnr: req.body.pnr };
    dbo.collection("pnrDetails").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.json(result);
    });
  }); 
 });

 app.post('/trainSearch',(req,res) =>{
   console.log(req.body);
   MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },function(err, db) {
    if (err) throw err;
    var dbo = db.db("raildb");
    var query = { source: req.body.source, destination: req.body.destination, date: req.body.date };
    dbo.collection("railDetails").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.json(result);
    });
  }); 
 });

 app.post('/mailservice', async(req,res) => {
   var nodemailer = require('nodemailer');
  var smtpTransport = require('nodemailer-smtp-transport');
  console.log(req.body.mailContent);
   var transporter = nodemailer.createTransport(smtpTransport({
     service: 'gmail',
     //type: "SMTP",
     host: "smtp.gmail.com",
     //port: 587,
     //secure: false,
     //debug: true,
     auth:{
       user: 'subusj11@gmail.com',
       pass: '199911feb'
     }
   }));

   var mailOptions ={
     from: 'subusj11@gmail.com',
     to: 'vickygokul5@gmail.com',
     subject: 'Ticket Confirmation',
     //text: 'Your ticket has been confirmed'
     html: req.body.mailContent
   };

   transporter.sendMail(mailOptions, function(error, info){
     if(error){
       console.log(error);
     }
     else{
       console.log(info.response);
       res.json(info);
     }
   })
 })

 app.post('/railwaydetails', (req,res) => {
var array = [
  { name: 'Chennai Express',date: '2020-09-16',time: '08:00 AM', source: 'chennai', destination: 'tuticorin', ac_3_tier: { s1:{lower:[1,6,7,12,15,20,23,28,31,36,39,44,47,52], middle:[2,5,8,11,16,19,24,27,32,35,40,43,48,51], upper:[3,4,9,10,17,18,25,26,33,34,41,42,49,50], sidelower:[7,13,21,29,37,45,53], sideupper:[8,4,22,30,38,46,54]}},
sleeper: { s2:{lower:[1,6,7,12,15,20,23,28,31,36,39,44,47,52], middle:[2,5,8,11,16,19,24,27,32,35,40,43,48,51], upper:[3,4,9,10,17,18,25,26,33,34,41,42,49,50], sidelower:[7,13,21,29,37,45,53], sideupper:[8,4,22,30,38,46,54]}},
first_class: { s3:{lower:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}}},
{ name: 'Tuticorin Express',date: '2020-09-16',time: '19:30 PM', source: 'chennai', destination: 'tuticorin', ac_3_tier: { s1:{lower:[1,6,7,12,15,20,23,28,31,36,39,44,47,52], middle:[2,5,8,11,16,19,24,27,32,35,40,43,48,51], upper:[3,4,9,10,17,18,25,26,33,34,41,42,49,50], sidelower:[7,13,21,29,37,45,53], sideupper:[8,4,22,30,38,46,54]}},
sleeper: { s2:{lower:[1,6,7,12,15,20,23,28,31,36,39,44,47,52], middle:[2,5,8,11,16,19,24,27,32,35,40,43,48,51], upper:[3,4,9,10,17,18,25,26,33,34,41,42,49,50], sidelower:[7,13,21,29,37,45,53], sideupper:[8,4,22,30,38,46,54]}},
first_class: { s3:{lower:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}}},
{ name: 'Chennai Express',date: '2020-09-18',time: '08:00 AM', source: 'chennai', destination: 'coimbatore', ac_3_tier: { s1:{lower:[1,6,7,12,15,20,23,28,31,36,39,44,47,52], middle:[2,5,8,11,16,19,24,27,32,35,40,43,48,51], upper:[3,4,9,10,17,18,25,26,33,34,41,42,49,50], sidelower:[7,13,21,29,37,45,53], sideupper:[8,4,22,30,38,46,54]}},
sleeper: { s2:{lower:[1,6,7,12,15,20,23,28,31,36,39,44,47,52], middle:[2,5,8,11,16,19,24,27,32,35,40,43,48,51], upper:[3,4,9,10,17,18,25,26,33,34,41,42,49,50], sidelower:[7,13,21,29,37,45,53], sideupper:[8,4,22,30,38,46,54]}},
first_class: { s3:{lower:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}}},
{ name: 'Coimbatore Express',date: '2020-09-18',time: '19:30 PM', source: 'chennai', destination: 'coimbatore', ac_3_tier: { s1:{lower:[1,6,7,12,15,20,23,28,31,36,39,44,47,52], middle:[2,5,8,11,16,19,24,27,32,35,40,43,48,51], upper:[3,4,9,10,17,18,25,26,33,34,41,42,49,50], sidelower:[7,13,21,29,37,45,53], sideupper:[8,4,22,30,38,46,54]}},
sleeper: { s2:{lower:[1,6,7,12,15,20,23,28,31,36,39,44,47,52], middle:[2,5,8,11,16,19,24,27,32,35,40,43,48,51], upper:[3,4,9,10,17,18,25,26,33,34,41,42,49,50], sidelower:[7,13,21,29,37,45,53], sideupper:[8,4,22,30,38,46,54]}},
first_class: { s3:{lower:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}}},
{ name: 'Tirunelveli Express',date: '2020-09-19',time: '08:00 AM', source: 'tirunelveli', destination: 'chennai', ac_3_tier: { s1:{lower:[1,6,7,12,15,20,23,28,31,36,39,44,47,52], middle:[2,5,8,11,16,19,24,27,32,35,40,43,48,51], upper:[3,4,9,10,17,18,25,26,33,34,41,42,49,50], sidelower:[7,13,21,29,37,45,53], sideupper:[8,4,22,30,38,46,54]}},
sleeper: { s2:{lower:[1,6,7,12,15,20,23,28,31,36,39,44,47,52], middle:[2,5,8,11,16,19,24,27,32,35,40,43,48,51], upper:[3,4,9,10,17,18,25,26,33,34,41,42,49,50], sidelower:[7,13,21,29,37,45,53], sideupper:[8,4,22,30,38,46,54]}},
first_class: { s3:{lower:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}}},
{ name: 'Tuticorin Express',date: '2020-09-19',time: '19:30 PM', source: 'tuticorin', destination: 'chennai', ac_3_tier: { s1:{lower:[1,6,7,12,15,20,23,28,31,36,39,44,47,52], middle:[2,5,8,11,16,19,24,27,32,35,40,43,48,51], upper:[3,4,9,10,17,18,25,26,33,34,41,42,49,50], sidelower:[7,13,21,29,37,45,53], sideupper:[8,4,22,30,38,46,54]}},
sleeper: { s2:{lower:[1,6,7,12,15,20,23,28,31,36,39,44,47,52], middle:[2,5,8,11,16,19,24,27,32,35,40,43,48,51], upper:[3,4,9,10,17,18,25,26,33,34,41,42,49,50], sidelower:[7,13,21,29,37,45,53], sideupper:[8,4,22,30,38,46,54]}},
first_class: { s3:{lower:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}}},
{ name: 'Nagercoil Express',date: '2020-09-19',time: '08:00 AM', source: 'chennai', destination: 'kanyakumari', ac_3_tier: { s1:{lower:[1,6,7,12,15,20,23,28,31,36,39,44,47,52], middle:[2,5,8,11,16,19,24,27,32,35,40,43,48,51], upper:[3,4,9,10,17,18,25,26,33,34,41,42,49,50], sidelower:[7,13,21,29,37,45,53], sideupper:[8,4,22,30,38,46,54]}},
sleeper: { s2:{lower:[1,6,7,12,15,20,23,28,31,36,39,44,47,52], middle:[2,5,8,11,16,19,24,27,32,35,40,43,48,51], upper:[3,4,9,10,17,18,25,26,33,34,41,42,49,50], sidelower:[7,13,21,29,37,45,53], sideupper:[8,4,22,30,38,46,54]}},
first_class: { s3:{lower:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}}},
{ name: 'Kaveri Express',date: '2020-09-19',time: '19:30 PM', source: 'madurai', destination: 'chennai', ac_3_tier: { s1:{lower:[1,6,7,12,15,20,23,28,31,36,39,44,47,52], middle:[2,5,8,11,16,19,24,27,32,35,40,43,48,51], upper:[3,4,9,10,17,18,25,26,33,34,41,42,49,50], sidelower:[7,13,21,29,37,45,53], sideupper:[8,4,22,30,38,46,54]}},
sleeper: { s2:{lower:[1,6,7,12,15,20,23,28,31,36,39,44,47,52], middle:[2,5,8,11,16,19,24,27,32,35,40,43,48,51], upper:[3,4,9,10,17,18,25,26,33,34,41,42,49,50], sidelower:[7,13,21,29,37,45,53], sideupper:[8,4,22,30,38,46,54]}},
first_class: { s3:{lower:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}}}
  ];

  var url1 = "mongodb://localhost:27017/";
  MongoClient.connect(url1,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
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
    var dbo = db.db("raildb");
    dbo.collection("railDetails").insertMany(array, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  }); 
});

app.post('/seat',(req,res) =>{
  console.log(req.body.name);
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
   // var dbo = db.db("pnrdb");
   // dbo.createCollection("pnrDetails", function(err, res) {
   //   if (err) throw err;
   //   console.log("Collection created!");

   //   db.close();
   // });
   if (err) throw err;
   var dbo = db.db("seatdb");
   var query = { name: req.body.name };
   dbo.collection("seatDetails").find(query).toArray(function(err, result) {
     if (err) throw err;
     console.log(result);
     db.close();
     res.json(result);
   });
 }); 
});

app.post('/seatdetails', (req,res) => {
  var array = [{name: "Chennai Express", seat: 300}, {name: "Tirunelveli Express", seat: 300}, {name: "Coimbatire Express", seat: 300},
  {name: "Nagercoil Express", seat: 300}, {name: "Kaveri Express", seat: 300}]
  var url1 = "mongodb://localhost:27017/";
  MongoClient.connect(url1,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
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
    var dbo = db.db("seatdb");
    dbo.collection("seatDetails").insertMany(array, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
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
