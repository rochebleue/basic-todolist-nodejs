var express = require('express');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var app = express();

app.use('/public', express.static('public'));
app.use(cookieSession({  secret: 'todotopsecret'}));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
cookieSession.tasks = ['Faire la vaisselle', 'Ranger les papiers'];


app.get('/', function(req, res) {
	console.log(cookieSession.tasks);
    res.setHeader('Content-Type', 'text/html');
    res.render('tasks.ejs', {
		title: 'Todolist with node',
		tasks: cookieSession.tasks
	});
})
.post('/add', urlencodedParser, function(req, res) {
	taskName = req.body.taskName;
	if (taskName) {
		cookieSession.tasks.push(taskName);
	}
	res.redirect('/');
})
.get('/remove/:id', function(req, res) {
	taskId = req.params.id;
	if (cookieSession.tasks.length > (taskId)) {
		cookieSession.tasks.splice(taskId, 1);
	}
	res.redirect('/');
})
.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080);