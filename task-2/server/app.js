const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const pool = require("./db/pool");

require("dotenv").config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/", userRoutes);

pool.connect(function (res, error) {
  console.log(`Connected!!!`);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
