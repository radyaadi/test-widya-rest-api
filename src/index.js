const express = require('express');
const cors = require('cors');
const connectToDb = require('./config/db-config');
require('dotenv').config();

const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/user', userRoute);
app.use('/product', productRoute);

app.get('/', (req, res) => {
  res.send('Hi!');
});

connectToDb().then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
