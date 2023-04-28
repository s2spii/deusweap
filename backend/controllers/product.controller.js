const Product = require("../models/product.model");

module.exports.getProducts = async (req, res) => {
  const products = await Product.findAll();
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

  const product = await Product.create({
    categories: req.body.categories,
    name: req.body.name,
    buy_price: req.body.buy_price,
    sell_price: req.body.sell_price,
    img_path: req.body.img_path,
  });
  res.status(200).json(product);
};

module.exports.editProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);

  if (!product) {
    res.status(400).json({ message: "Ce produit n'existe pas" });
  }

  const updateProduct = await product.update(req.body);
  res.status(200).json(updateProduct);
};

module.exports.deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);

  if (!product) {
    res.status(400).json({ message: "Ce produit n'existe pas" });
    return;
  }

  await product.destroy();
  res.status(200).json(`Le message n°${req.params.id} a bien été supprimé !`);
};
