// Modules
const http = require('http');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

// Controllers
const dbTestController = require('./controllers/database_test_controller');

/* Dynamic Port */
const port = process.env.PORT || 3000;

/* View Engine */
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/* Load static file */
app.use(express.static('./public'));

/* Body Parser Middleware */
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Fire controller
dbTestController(app); //passing app to the other module so we can use it. Which makes me wonder why app specifically? Why can't we on the other module require('express')?

/* Basic Route; when get request is made, responds with hello world */
app.get('/', (req, res) => {

	res.render('home', {title: 'Home'});

});

/* Post Method */
app.post('/', (req, res) => {


});

/* Listen */
app.listen(port, () => console.log(`I'm listening on port ${port}!`));