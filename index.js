const express = require("express");
const app = express();

const PORT = 2022;

app.use(express.json());

const { connectDB } = require("./db/connection");

connectDB().then(() => {
  console.log("MongoDB Connected!");
});

const { User } = require("./db/user");
const bcrypt = require("bcrypt");

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const findUser = await User.findOne({
    username,
  });

  if (findUser) {
    return res.status(400).json({
      message: "Username has been taken",
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 5);

  await User.create({
    username: username,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "User registered!",
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const findUser = await User.findOne({
    username,
  });

  if (!findUser) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isPasswordValid = bcrypt.compareSync(password, findUser.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Wrong password",
    });
  }

  return res.status(200).json({
    message: "User logged in",
    user_data: findUser,
  });
});

app.listen(PORT, () => {
  console.log("Listening in port", PORT);
});
