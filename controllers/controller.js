const path = require('path');

exports.routeController = (req,res) =>{
    res.sendFile(path.resolve('public/index.html'));
    //res.send("Example using controllers");
}

exports.migrateRoute = (req,res) =>{
    res.sendFile(path.resolve('public/login.html'));
    //res.send("routing .........");
}
