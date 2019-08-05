const express = require('express');
const router = express.Router();

const { add, remove, clear } = require('../controllers/favorites');
const { requireSignin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { productById } = require('../controllers/product');



router.post('/favorites/add/:userId', requireSignin, isAuth, add);
router.put('/favorites/remove/:userId', requireSignin, isAuth, remove);

router.param('productId', productById);
router.param('userId', userById);


module.exports = router;