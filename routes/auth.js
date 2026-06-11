const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const router = express.Router();
const mongoose = require("mongoose");
const FederatedCredential = require("../models/federated_credentials");
const User = require("../models/users");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile"],
    },
    async (issuer, profile, cb) => {
      try {
        const fc = await FederatedCredential.findOne({
          provider: issuer,
          subject: profile.id,
        });

        if (!fc) {
          const addResult = await User.insertOne({
            name: profile.displayName,
            email: "default@default.com",
            phone: "+1000000000",
          });

          if (addResult) {
            const fcAddResult = await FederatedCredential.insertOne({
              userId: addResult.id,
              provider: issuer,
              subject: profile.id,
            });

            if (fcAddResult) {
              const user = {
                _id: addResult.id,
                name: profile.displayName,
              };

              return cb(null, user);
            }
          }
        } else {
          const user = await User.findOne({ _id: fc.userId });

          if (!user) return cb(null, false);
          return cb(null, user);
        }
      } catch (err) {
        return cb(err);
      }
    },
  ),
);

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { _id: user._id, username: user.username, name: user.name });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});

router.get("/login", passport.authenticate("google"));

router.get(
  "/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/api-docs",
    failureRedirect: "/oauth2/login",
  }),
);

router.get("/logout", async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/api-docs");
  });
});

module.exports = router;
