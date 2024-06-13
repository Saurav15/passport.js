import express from "express";
import passport from "passport";

// Enabling sessions to store passport sessions
import session from "express-session";
// Imporing passport config
import "./passport-config.js";

const app = express();

// Configure Express session middleware
app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
    })
  );

app.get("/test", (req, res) => {
  res.send("Test :))");
});

// Middlewares
app.use(passport.initialize());
app.use(passport.session());

// Routes
// Route to start OAuth 2.0 flow
app.get(
  "/auth/google",
  (req, res, next) => {
    console.log("Inside google middleware :P");
    next();
  },
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Callback route for handling redirect from OAuth provider
app.get(
  "/authenticated-dash",
  (req, res, next) => {
    console.log("Reached in callback");
    next();
  },
  passport.authenticate("google", {
    failureRedirect: "/frontend/login.html",
    failureMessage: true,
  }),
  function (req, res) {
    console.log("Inside redirect path :) ");
    // Successful authentication, redirect home
    res.redirect("/frontend/success.html");
  }
);

app.listen(3000, () => {
  console.log("Server running at 3000.");
});
