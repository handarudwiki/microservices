const express = require('express');
const {create, getRefreshTokens} = require('../Controller/RefreshTokenController')
const router = express.Router();

router.post('/',create);
router.get('/',getRefreshTokens)

module.exports = router;