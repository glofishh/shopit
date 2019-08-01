const express = require('express');
const router = express.Router();

const { favoriteItemById, add, remove, clear } = require('../controllers/favorites');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { productById } = require('../controllers/product');



router.post('/favorites/add/:userId', requireSignin, isAuth, add);
router.put('/favorites/remove/:favoriteItemId/:userId', requireSignin, isAuth, remove);
router.put('/favorites/clear/all/:userId', requireSignin, isAuth, clear);

router.param('favoriteItemId', favoriteItemById);
router.param('userId', userById);


module.exports = router;