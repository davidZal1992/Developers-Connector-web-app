const GitHubStrategy = require('passport-github').Strategy;
const config = require('config');

module.exports = function(passport){
passport.use(new GitHubStrategy({
    clientID: config.get('githubClientId'),
    clientSecret: config.get('githubSecret'),
    callbackURL: "http://localhost:5000/api/oauth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
  }
))
};