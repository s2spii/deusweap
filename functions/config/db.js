const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(
        "mongodb+srv://s2spii:rayaneBG35@app-js-fullstack.emuqsml.mongodb.net/deusweap"
      )
      .then(() => console.log("Mongo Connected"));
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

module.exports = connectDB;
