// const { FavoriteItem, Favorites } = require('../models/favorites');
// const { errorHandler } = require('../helpers/dbErrorHandler');

// exports.addFavorite = (req, res) => {
//   const newFavoriteItem = new FavoriteItem(req.body);
//   newFavoriteItem.save((err, data) => {
//     if(err) {
//       return res.status(400).json({
//         error: errorHandler(err)
//       });
//     }
//     res.json({data: data});
//   });
// };

// exports.readFavoriteItem = (req, res) => {
//   return res.json(req.FavoriteItem);
// }

// exports.removeFavoriteItem = (req, res) => {
//   const favoriteItem = req.favoriteItem;
//   favoriteItem.remove((err, data) => {
//     if (err) {
//       return res.status(400).json({
//         error: errorHandler(err)
//       });
//     }
//     res.json({
//       message: 'Favorites Item successfully deleted'
//     });
//   });
// };

// exports.listFavoriteItems = (req, res) => {
//   FavoriteItem.find().exec((err, data) => {
//     if (err) {
//       return res.status(400).json({
//         error: errorHandler(err)
//       })
//     }
//     res.json(data);
//   });
// };



