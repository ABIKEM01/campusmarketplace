const express = require('express');
const router = express.Router();

const passport = require('../config/passport');

router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email']
  })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/login-failed'
  }),
  (req, res) => {
    res.redirect('/auth/profile');
  }
);

router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: 'Not logged in'
    });
  }

  res.status(200).json(req.user);
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.status(200).json({
        message: 'Logged out successfully'
      });
    });
  });
});

router.get('/login-failed', (req, res) => {
  res.status(401).json({
    message: 'GitHub Login Failed'
  });
});

module.exports = router;