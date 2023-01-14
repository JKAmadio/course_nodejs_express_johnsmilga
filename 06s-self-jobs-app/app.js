require('dotenv').config();
const express = require('express');
const { connectDb } = require('./db/connect');
const { notFound } = require('./middleware/not-found');
const app = express();

const authRoute = require('./routes/auth');

app.use(express.json());

app.use('/api/v1/auth', authRoute);

app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
