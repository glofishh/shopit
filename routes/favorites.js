const express = require('express');
const router = express.Router();

const { favoriteById, add, read, remove, list } = require('../controllers/favorites');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');


// router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
//   res.json({
//     user: req.profile
//   });
// });


router.get('/favorites/:favoriteId', read);
router.post('/favorites/add/:userId', add);
router.delete('/favorites/:favoriteId/:userId', remove);

router.param('favoriteId', favoriteById);
router.param('userId', userById);


module.exports = router;