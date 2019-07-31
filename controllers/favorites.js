const { FavoriteItem, FavoritesList } = require('../models/favorites');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Product = require('../models/product');
const User = require("../models/user");


exports.favoritesListById = (req, res, next, id) => {
  FavoritesList.findById(id).exec((err, favorites) => {
      if (err || !favorites) {
          return res.status(400).json({
              error: "Favorites list not found"
          });
      }
      req.favorites = favorites;
      next();
  });
};

exports.favoriteItemById = (req, res, next, id) => {
  FavoriteItem.findById(id).exec((err, favorite) => {
      if (err || !favorite) {
          return res.status(400).json({
              error: "Favorite item not found"
          });
      }
      req.favorite = favorite;
      next();
  });
};

exports.add = (req, res) => {
  console.log(req.body)
  req.body.user = req.profile;
  console.log('USER ' + req.body.user)
  const newFavoriteItem = new FavoriteItem(req.body);

  User.findOneAndUpdate(
    { _id: req.body.user._id },
    { $addToSet: { favorites: newFavoriteItem } },
    (error, result) => {
      if (error) {
        return res.status(400).json({
          error: 'could not update user favorites'
        });
      }
      res.json(`user ${req.profile.name} favorites list updated with ${req.body.name}`)
    }
  );
};

exports.remove = (req, res) => {
  console.log(req.body)
  req.body.user = req.profile;
  console.log('USER ' + req.body.user)
  const deletedItem = FavoriteItem(req.body);

  FavoriteItem.find(
    { _id: req.body._id },
    (error, product) => {
      if (error) {
        return res.status(400).json({
          error: 'could not delete item from favorites'
        });
      }
      User.findOneAndUpdate(
        { _id: req.body.user._id },
        { $pull: { favorites: deletedItem } },
        (error, result) => {
          if (error) {
            return res.status(400).json({
              error: 'could not update user favorites'
            });
          }
          res.json(`removed ${req.body.name} from ${req.profile.name}'s favorites list`)
        }
      );
    }
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

//======================================
// exports.addFavorite = (req, res) => {
//   let product = req.product;
//   product.remove((err, deletedProduct) => {
//     if (err) {
//       return res.status(400).json({
//         error: errorHandler(err)
//       });
//     }

//       User.findOneAndUpdate(
//         { _id: req.profile._id },
//         { $addToSet: { favorites: product } },
//         (error, result) => {
//           if (error) {
//             console.log('got to error')
//             return res.status(400).json({
//               error: 'could not update user favorites'
//             });
//           }
//           console.log(req.profile.favorites)
//         console.log('LENGTH OF FAVORITES ' + req.profile.favorites.length)
//           res.json(`user favorites list updated`)
//         }
//       );
//       // res.json(`item ${data.name} successfully added to favorites`)
//     });
// };

// exports.removeFavorite = (req, res) => {
//   console.log('HELLO')
//   Product.find({ _id: req.params.productId })
//     .exec((err, product) => {
//       if (err) {
//         console.log('CANT FIND PRODUCT WHY')
//         return res.status(400).json({
//           error: 'boo'
//         });
//       }
//       console.log('THIS SHOULD BE A FAVORITE PRODUCT ' + product);
//     })
//     User.findOneAndUpdate(
//       { _id: req.profile._id },
//       { $unset: { favorites: product } },
//       (error, result) => {
//         if (error) {
//           console.log('got to error')
//           return res.status(400).json({
//             error: 'could not update user favorites'
//           });
//         }
//         console.log(req.profile.favorites)
//         console.log('LENGTH OF FAVORITES ' + req.profile.favorites.length)
//         res.json((`item successfully removed from favorites`))
//       }
//     );

// };

// exports.clearFavorites = (req, res) => {
//   const favorites = [];

//   User.findOneAndUpdate(
//     { _id: req.profile._id },
//     { $set: { favorites: favorites } },
//     (error, data) => {
//       if (error) {
//         console.log('got to error')
//         return res.status(400).json({
//           error: 'could not update user favorites'
//         });
//       }
//       console.log(req.profile.favorites.length)
//       res.json((`all items successfully removed from favorites`))
//     }
//   );
// };
//======================================