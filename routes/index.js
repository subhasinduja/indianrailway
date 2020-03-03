var express = require('express');
var router = express.Router();
const {routeController, migrateRoute} = require('../controllers/controller');
//const migrateRouter = require('../controllers/controller');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', routeController);

router.get('/login', migrateRoute);
module.exports = router;
