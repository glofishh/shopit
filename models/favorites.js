const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const FavoriteItemSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: 'User' },
    product: { type: ObjectId, ref: 'Product' },
    name: String,
    description: String,
    category: { type: ObjectId, ref: 'Category'},
    price: Number
  },
  { timestamps: true }
);

const FavoriteItem = mongoose.model('FavoriteItem', FavoriteItemSchema);

module.exports = { FavoriteItem };