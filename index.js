const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const urlRoute = require('./routes/urlRoute');
const connectDB = require('./config/database');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/userRoute');
const { restrictToLoggedInUserOnly, checkAuth } = require('./middlewares/authMiddleware');
// const { checkForAuthentication, restrictTo } = require('./middlewares/authMiddleware');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(checkForAuthentication);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.static('public'));

const MONGO_URL = process.env.MONGODB_URL;
connectDB(MONGO_URL);

app.use('/url', restrictToLoggedInUserOnly ,urlRoute);
// app.use('/url', restrictTo(["NORMAL"]) ,urlRoute);
// app.use('/',staticRoute);
app.use('/', checkAuth, staticRoute);
app.use('/user', userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});