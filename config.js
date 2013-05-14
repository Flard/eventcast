module.exports = function(app, express) {

    app.configure(function(){
        app.use(express.static(__dirname + '/public'));
        app.use(app.router);

        app.set('view engine', 'html')
        app.engine('html', require('hogan-express'));
    });


}