require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

//middleware
app.use(cors());
app.use(express.json());

const postsRoute = require("./routes/postsRoute");
const authRoute = require("./routes/authRoute");
const commentRoute = require("./routes/commentRoute");
const profilRoute = require("./routes/profilRoute");
app.use("/api/posts", postsRoute);
app.use("/api/users", authRoute);
app.use("/api/comments", commentRoute);
app.use("/api/profil", profilRoute);

mongoose.connect(process.env.MONGO_URL).then(
  app.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
  })
);
mongoose.connection.on("open", () => {
  console.log("Connected");
});
