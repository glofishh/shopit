const { errorHandler } = require('../helpers/dbErrorHandler');
const Product = require('../models/product');
const User = require("../models/user");


exports.add = (req, res) => {
  // console.log(req.body)
  req.body.user = req.profile;
  // console.log('USER ' + req.body.user)

  const favorite = Product(req.body);
  User.findOneAndUpdate(
    { _id: req.body.user._id },
    { $addToSet: { favorites: favorite } },
    ((error, result) => {
      if (error) {
        return res.status(400).json({
          error: 'could not update user favorites'
        })
      }
      res.json('added to favorites')
    })
  )
};

exports.remove = (req, res) => {
  console.log(req.body)
  req.body.user = req.profile;
  const removedFavorite = Product(req.body);

  User.findOneAndUpdate(
    { _id: req.body.user._id },
    { $pull: { favorites: removedFavorite } },
    ((error, result) => {
      if (error) {
        return res.status(400).json({
          error: 'could not update user favorites'
        })
      }
      res.json(`deleted ${removedFavorite.name}`)
    })
  )
};

exports.clear = (req, res) => {
  console.log(req.params)
  req.params.userId = req.profile._id;
  // console.log('USER ' + req.body.user)
  // const deletedItem = FavoriteItem(req.body);

  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: { favorites: [] } },
    (error, result) => {
      if (error) {
        return res.status(400).json({
          error: 'could not update user favorites'
        });
      }
      res.json(`removed  all from ${req.profile.name}'s favorites`)
    }
  );
};