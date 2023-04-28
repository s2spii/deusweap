const UserModel = require("../models/user.model");

module.exports.getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.status(200).json(users);
};

module.exports.setUsers = async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Veuillez indiquer un nom" });
  }
  if (!req.body.pass) {
    res.status(400).json({ message: "Veuillez indiquer un mot de passe" });
  }

  const product = await UserModel.create({
    name: req.body.name,
    pass: req.body.pass,
    grade: req.body.grade,
  });
  res.status(200).json(product);
};

module.exports.editUser = async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    res.status(400).json({ message: "Ce groupe n'existe pas" });
  }

  const updateUser = await UserModel.findByIdAndUpdate(user, req.body, {
    new: true,
  });

  res.status(200).json(updateUser);
};

module.exports.deleteUser = async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    res.status(400).json({ message: "Ce groupe n'existe pas" });
  }

  await user.deleteOne();
  res.status(200).json(`Le groupe a bien été supprimé !`);
};
