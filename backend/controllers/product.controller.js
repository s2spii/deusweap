const ProductModel = require("../models/products.model");

module.exports.getProducts = async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json(products);
};

module.exports.setProducts = async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Veuillez indiquer un nom" });
  }
  if (!req.body.buy_price) {
    res.status(400).json({ message: "Veuillez indiquer un prix d'achat" });
  }
  if (!req.body.sell_price) {
    res.status(400).json({ message: "Veuillez indiquer un prix de vente" });
  }

  const product = await ProductModel.create({
    categories: req.body.categories,
    name: req.body.name,
    buy_price: req.body.buy_price,
    sell_price: req.body.sell_price,
    img_path: req.body.img_path,
  });
  res.status(200).json(product);
};

module.exports.editProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    res.status(400).json({ message: "Ce product n'existe pas" });
  }

  const updateProduct = await ProductModel.findByIdAndUpdate(
    product,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updateProduct);
};

module.exports.deleteProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    res.status(400).json({ message: "Ce produit n'existe pas" });
  }

  await product.deleteOne();
  res.status(200).json(`Le message n°${req.params.id} a bien été supprimé !`);
};
