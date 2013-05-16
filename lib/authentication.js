module.exports = function() {

    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy(
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

}