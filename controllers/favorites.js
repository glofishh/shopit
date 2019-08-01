const { FavoriteItem, FavoritesList } = require('../models/favorites');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Product = require('../models/product');
const User = require("../models/user");


exports.favoriteItemById = (req, res, next, id) => {
  FavoriteItem.findById(id).exec((err, favorite) => {
      if (err || !favorite) {
          console.log(id)
          return res.status(400).json({
              error: "Favorite item not found"
          });
      }
      req.favorite = favorite;
      next();
  });
};

exports.add = (req, res) => {
  // console.log(req.body)
  req.body.user = req.profile;
  // console.log('USER ' + req.body.user)

  const favorite = new FavoriteItem(req.body);
  favorite.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error)
      });
    }
    User.findOneAndUpdate(
      { _id: req.body.user._id },
      { $addToSet: { favorites: favorite } },
      ((error, result) => {
        if (error) {
          return res.status(400).json({
            error: 'could not update user favorites'
          });
        }
      })
    )
    res.json(`user ${req.profile.name} favorites list updated with ${req.body.name}`)
  });
};

exports.remove = (req, res) => {
  // console.log(req.params)
  req.params.userId = req.profile;

  FavoriteItem.find(
    { _id: req.params.favoriteItemId },
    (error, item) => {
      if (error) {
        return res.status(400).json({
          error: `couldn't find item matching params`
        })
      }
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { favorites: { $in: item } } },
        { multi: true },
        (error, success) => {
          if (error) {
            return res.status(400).json({
              error: `could not update user favorites`
            });
          }
          // console.log('found user and updated ' + success)
        }
      )
    }  
  ).remove((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(result)
  })
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