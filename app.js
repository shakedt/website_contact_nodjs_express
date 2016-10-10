var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('index', {title: 'Computer Broken? we are here to help'});
});

app.get('/about', function(req,res){
	res.render('about');
});


app.get('/contact', function(req,res){
	res.render('contact');
});

app.post('/contact/send', function(req,res){
	var transporter = nodemailer.createTransport({
		service: "Gmail",
		auto:{user:'myemail@gmail.com',
			  pass: 'soNOTSecure.com'
			  }
	});

	var mailOptions = {
		from: 'MAINEMAIL',
		to: 'MESSEdUP',
		subject: 'website submission',
		text: 'you have a submission with the following details... Name:' + req.body.name + 'email: ' + req.body.email + 'message: ' + req.body.message,
		html: '<p>you have a submission with the following details...</p><ul><li>Name:' + req.body.name + ' </li></ul>'
	}

	transporter.sendMail(mailOptions, function(error,info){
		if(erro){
			console.log('error');
			res.redirect('/');
		}else {
			console.log('Message Sent: ' + info.response);
			res.redirect('/');
		}
	});
});

app.listen(3003);
console.log('Server is running on port 3003...');