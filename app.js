require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db/connect");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/favorites", require("./routes/favorites"));
app.use("/messages", require("./routes/messages"));
app.use("/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("Welcome to the Campus Marketplace API");
});

app.use((err, req, res, next) => {
  console.log("Server Error: ", err);
  res.status(500).json({
    message: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
