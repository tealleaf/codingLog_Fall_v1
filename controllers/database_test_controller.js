const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Connect to DB, wtf I was entering into another database (codinglogmodel) even with this... OH... I was making COLLECTIONS, not new database
mongoose.connect('mongodb://test:testtest1@ds111963.mlab.com:11963/todo_test_db', { useNewUrlParser: true });

// From MongooseJS Docs, check connection.
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
  // we're connected!
  console.log('Successfully connected to MongoDB!');
});

//Schema, kind of like... defining your columns
const logSchema = new mongoose.Schema({
	goal: String,
	timeCoded: Number,
	date: Date
});

//Model, kind of like... a table item with the declared schema/column that will hold actual data.
const CodingLog = mongoose.model('CodingLogModel', logSchema); //You're declaring a new table/collection here

/* Body Parser Middleware */
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => { //for some reason... you're able to use templating in here? How? 
	
	/* GET METHOD */
	app.get('/', (req, res) => {
		//grab from mongodb, everything
		CodingLog.find({}, (err, data)=>{
			if (err) throw err;
			// console.log('This is inside GET: ' + data);
			res.render('home', {items: data});
		});
	});

	//Grabs parameter
	app.get('/:grab', urlencodedParser, (req, res) => {

	});
	
	/* POST METHOD */
	app.post('/', urlencodedParser, (req, res) => {
		console.log('This has been posted: ');
		console.log(req.body);

		//Mongoose CREATE
		let log_entry = new CodingLog(req.body);
		log_entry.save(function (err) {
			if (err) return handleError(err);
			else {
				console.log('Data has been created!');
				res.send('Data has been inserted!');
			}
		});	
	});

	/* DELETE METHOD */
	//Not really sure of the idea behind deleteOne... you use it with Find apparently
	app.delete('/', urlencodedParser, (req, res) => {

		CodingLog.remove({ _id: req.body.id }, (err) => {
			console.log(req.body.id);
		    if (!err) {
	            res.send('Item deleted!');
		    }
		    else {
	            res.send('Error has occurred!');
		    }
		});
	}); 

	/* PUT METHOD */
	app.put('/', urlencodedParser, (req, res) => {

		const doc_id = req.body.id;
		const update_changes = req.body;

		console.log(req.body);

		//By Promises
		CodingLog.findById(doc_id).then((model) => {
			return Object.assign(model, update_changes);
		}).then((model) => {
			return model.save();
		}).then((updatedModel) => {
			res.json({
				msg: 'model updated',
				updatedModel
			});
		}).catch((err) => {
			res.send(err);
		});
	}); //end put

}; //end app export