const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log(error));

const schema = mongoose.Schema({
  name:String,
  email: String,
  psd: String,
});

const model = mongoose.model("loginCred", schema);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});


app.post("/signup", async (req, res) => {
  const { name,email, psd } = req.body;

  try {
    const existingUser = await model.findOne({ email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(psd, 10);
      const data = new model({ name,email, psd: hashedPassword });
      await data.save();

      res.status(200).json({ message: "Successfully signed up" });
    } else {
      res.status(409).json({ message: "User already exists" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, psd } = req.body;
  try {
    const user = await model.findOne({ email });
    if (user && await bcrypt.compare(psd, user.psd)) {
      res.status(200).json({ message: "Successfully logged in" });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


app.put("/forgotpsd", async (req, res) => {
  const { email, psd } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(psd, 10);
    const user = await model.findOneAndUpdate(
      { email },
      { psd: hashedPassword },
      { new: true }
    );

    if (user) {
      res.status(200).json({ message: "Password updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
