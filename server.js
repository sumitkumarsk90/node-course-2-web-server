const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname +"/views/partials");
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now} : ${req.method}, ${req.url}`
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err){
			console.log('Unable to append log records to sever.log');
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', () =>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});
app.get('/', (req, res) => {
	// res.send('<h1>Hello Express!!!!</h1>');
	res.render('home.hbs', {
		pageTitle: "About Page bro",
		currentYear : new Date().getFullYear(),
		welcomeMsg: "Welcome to the party"
	});
});

app.get('/about', (req, res) => {
	// res.send('About this lovely page');
	res.render('about.hbs', {
		pageTitle: "About Page",
		currentYear : new Date().getFullYear()
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs',{
		ageTitle: "About Page bro",
		currentYear : new Date().getFullYear(),
		welcomeMsg: "Welcome to the party",
		portfolioMsg : 'Portfolio Page here'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		message : "Some Error is happening",
		ErrCode: 505
	});
});

app.listen(port, () => {
	console.log(`The server is up on port ${port}`);
});