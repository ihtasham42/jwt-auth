const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

dotenv.config()

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true },
  () => {console.log("MongoDB connected")}
);


app.listen(3000, () => {
  console.log("listening");
});

app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);



