const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes')

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 5000;
const uri = process.env.DB_URL;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
    console.log("MongoDB Connected");
});

app.use("/api/auth", authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/listings', listingRoutes);

app.listen(port, () => {
    console.log(`AcquireSpace backend listening at ${port}`);
});

module.exports = app;
