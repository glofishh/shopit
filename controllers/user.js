const { User } = require('../models/user');
const { Order } = require('../models/order');
const { FavoriteItem } = require('../models/favorites');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    req.profile = user
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true}, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: 'You do not have authorized access to perform this action'
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

exports.addOrderToUserHistory = (req, res, next) => {
  let history = [];

  req.body.order.products.forEach(item => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount
    });
  });

  User.findOneAndUpdate(
      { _id: req.profile._id },
      { $push: { history: history } },
      { new: true },
      (error, data) => {
        if (error) {
          return res.status(400).json({
            error: 'could not update user purchase history'
          });
        }
        next();
      }
  );
};

exports.purchaseHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate('user', '_id name')
    .sort('-created')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      res.json(orders);
    });
};

exports.addFavorite = (req, res) => {
  const newFavoriteItem = new FavoriteItem(req.body);
  console.log(newFavoriteItem)

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $addToSet: { favorites: newFavoriteItem } },
    (error, data) => {
      if (error) {
        console.log('got to error')
        return res.status(400).json({
          error: 'could not update user favorites'
        });
      }
      console.log(req.profile.favorites)
      res.json((`item ${req.body.name} successfully added to favorites`))
    }
  );
};

exports.removeFavorite = (req, res) => {
  //need to delete by ID of favorite
  const selectedFavoriteItem = FavoriteItem(req.body);
  console.log(selectedFavoriteItem)

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $pull: { favorites: selectedFavoriteItem } },
    (error, data) => {
      if (error) {
        console.log('got to error')
        return res.status(400).json({
          error: 'could not update user favorites'
        });
      }
      console.log(req.profile.favorites)
      console.log(req.profile.favorites.length)
      res.json(`item ${req.body.name} successfully deleted from favorites`);
    }
  );
};

// exports.favoritesList = (req, res) => {
//   User.find({ user: req.profile._id })
//     .exec((err, favorites) => {
//       if (err) {
//         return res.status(400).json({
//           error: errorHandler(err)
//         })
//       }
//       res.json(favorites);
//     });
// };

exports.getAllFavorites = (req, res) => {
  User.find({user: req.profile._id}, (err, data) => { 
      if (err) {
        return res.status(400).json({
          error: 'cannot get favorites by user'
        });
      }
      console.log(req.profile.favorites.length);
      res.json(req.profile.favorites)
    });
};