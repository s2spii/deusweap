const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const sequelize = require("./config/db");
const port = 5000;

const app = express();

app.use(cors());

// Middleware qui permet de traiter les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/product", require("./routes/product.routes"));
app.use("/categories", require("./routes/category.routes"));
app.use("/users", require("./routes/user.routes"));

app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

sequelize
  .sync()
  .then(() => {
    app.listen(port, () =>
      console.log("Le serveur a démarré au port  " + port)
    );
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la synchronisation de la base de données",
      error
    );
  });

// Lancer le serveur
