const mongoose = require("mongoose");

const app = require("./app");

const {
  // DB_HOST,
  PORT,
} = process.env;

mongoose
  .connect(
    "mongodb+srv://monzhelesov:7uVMMPjfbcs5RNrG@cluster0.os8tovd.mongodb.net/db-contacts?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
