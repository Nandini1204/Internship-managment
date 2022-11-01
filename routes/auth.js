var express = require('express');
var router = express.Router();
var passport = require('passport');
const cors = require('cors')
const {isLoggedIn} = require('../middleWare/auth')
router.use(cors())

router.get('/failed', (req, res) => res.send('You Failed to log in!'))

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.send("Successfully registered")
  }
);


router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

module.exports = router;
