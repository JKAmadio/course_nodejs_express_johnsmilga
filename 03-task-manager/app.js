const express = require("express");
const app = express();

// import and execute the library dotenv
require("dotenv").config();

// import the callback function from the connect.js
const connectDB = require("./db/connect");

const tasks = require("./routes/tasks");

app.use(express.json());
app.use("/api/v1/tasks", tasks);

app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

const port = 3000;

// to make sure that we first try to connect to the database
// and only after the success we run our application
// we create a function that executes the connections
// we set this function asynchronously because the mongoose.connect function returns a Promise
const start = async () => {
  try {
    // we wait for the database to be connected
    await connectDB(process.env.MONGO_URI);
    // only then we set the port to be listened
    app.listen(port, () => {
      console.log(`Server is listening to port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
