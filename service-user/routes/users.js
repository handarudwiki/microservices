const express = require('express');
const router = express.Router();
const {register, login, update, getUser, getAllUsers, logout} = require('../Controller/UserController')

/* GET users listing. */
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.put('/:id', update);
router.get('/:id', getUser);
router.get('/', getAllUsers)

module.exports = router;
