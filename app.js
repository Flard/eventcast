var app = require('express').createServer();

// Add mustache
var stache = require('stache');
app.set('view engine', 'mustache');
app.register('.mustache', stache);

app.get('/', function(req, res){
    res.render('index.mustache', { title: 'EventCast' });
});

app.listen(3000);
