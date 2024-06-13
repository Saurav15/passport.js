import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";


passport.use(
  new GoogleStrategy(
    {
      clientID:
        "92038235010-p6ihfotq280ngrrabmsoqv0duccqrmcv.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/authenticated-dash",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log("Inside passport user :)))", accessToken);
      console.log("Profile: ", profile);
      console.log("Request: ");

      // Take the user details here and save it in the DB for the first time login
      // Else next
      done(null, profile);
    }
  )
);

// Serialize user into session
// What this does is takes the user details serializes it to user.id and stores it inside the session
passport.serializeUser((user, cb) => {
  // Here we take the access token and store it in our session.
  console.log("Serialize user : ", user);
  cb(null, user.id);
});

// Deserialize user from session
// Deserialize is called everytime we get the serealised data from the session i.e. user.id, it takes it and fetches the user from the DB and attaches it to the req.
passport.deserializeUser((id, cb) => {
  console.log("Deserialize User: ", id);
  cb(null, "hello");
});
