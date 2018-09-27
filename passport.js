let jwtStrategy = require('passport-jwt').Strategy;
let extractJwt = require('passport-jwt').ExtractJwt;
let User = require('./database-connection').user;

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme("JWT");
    opts.secretOrKey = 'very very secret';
    passport.use(new jwtStrategy(opts,async function(jwt_payload, done) {
        await User.findOne({
            where:{id: jwt_payload.id}
        })
        .then((user)=>{
            return done(null,user)
        }).catch((err)=>{
            return done(err);
        });
    }));
}