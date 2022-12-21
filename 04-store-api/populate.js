require("dotenv").config();

const connectDB = require("./db/connect");

const Product = require("./models/product");
const jsonProduct = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGODB);
    await Product.deleteMany();
    await Product.create(jsonProduct);
    console.log("Success! connected to database");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
