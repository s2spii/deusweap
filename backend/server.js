const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = 5000;

// connexion à la DB
connectDB();

const app = express();

app.use(cors({ origin: "*" }));

// Middleware qui permet de traiter les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/product", require("./routes/product.routes"));
app.use("/categories", require("./routes/category.routes"));
app.use("/users", require("./routes/user.routes"));

// Lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port  " + port));
