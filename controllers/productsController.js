const Product = require('../models/productModel');

exports.addProduct = (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });
  product
    .save()
    .then(() => res.json('產品新增'))
    .catch((err) => res.status(400).json('Error: ' + err));
};

exports.getAllProducts = (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json('Error: ' + err));
};

exports.deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json('產品刪除'))
    .catch((err) => res.status(400).json('Error: ' + err));
};