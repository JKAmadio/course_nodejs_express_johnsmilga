const express = require("express");
const app = express();

require("dotenv").config();

const connectdB = require("./db/connect");
const tasks = require("./routes/tasks");

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", tasks);

const start = async () => {
  try {
    await connectdB(process.env.MONGODB);

    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
