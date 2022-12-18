const express = require("express");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const products = require("./routes/products");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="api/v1/products/">products</a>');
});

app.use("/api/v1/products", products);

app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB);
    app.listen(port, console.log(`Server listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
