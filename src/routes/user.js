const router = require('express').Router();
const User = require('../models/user');

router.post('', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

router.post('/login', async (req, res) => {
  const user = await User.findByCredentials(req.body.email, req.body.password);
  res.send(user);
});

module.exports = router;
