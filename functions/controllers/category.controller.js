const CategoryModel = require("../models/categories.model");

module.exports.getCategories = async (req, res) => {
  const categories = await CategoryModel.find();
  res.status(200).json(categories);
};

module.exports.setCategory = async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Veuillez indiquer un nom" });
  }

  const category = await CategoryModel.create({
    name: req.body.name,
  });
  res.status(200).json(category);
};

module.exports.editCategory = async (req, res) => {
  const category = await CategoryModel.findById(req.params.id);

  if (!category) {
    res.status(400).json({ message: "Ce groupe n'existe pas" });
  }

  const updateCategory = await CategoryModel.findByIdAndUpdate(
    category,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updateCategory);
};

module.exports.deleteCategory = async (req, res) => {
  const category = await CategoryModel.findById(req.params.id);

  if (!category) {
    res.status(400).json({ message: "Ce produit n'existe pas" });
  }

  await category.deleteOne();
  res.status(200).json(`Le message n°${req.params.id} a bien été supprimé !`);
};
