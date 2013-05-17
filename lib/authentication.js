module.exports = function(app, express) {

    var passport = require('passport'),
        BasicStrategy = require('passport-http').BasicStrategy;

    passport.use(new BasicStrategy(
        function(username, password, done) {

                if (username !== 'admin') {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (password !== 'test') {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user);

        }
    ));

    app.set('passport', passport);

}