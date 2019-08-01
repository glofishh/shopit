const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const {
    userById,
    read,
    update,
    purchaseHistory,
    getAllFavorites
} = require("../controllers/user");
const { productById } = require("../controllers/product");


router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);
router.get("/orders/by/user/:userId", requireSignin, isAuth, purchaseHistory);
router.get('/favorites/by/user/:userId', requireSignin, isAuth, getAllFavorites);

router.param("userId", userById);

module.exports = router;