const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/db/dbConnect");
const usersRoute = require("./routes/user/userRoutes");
const productsRoute = require("./routes/products/productsRoute");
const categoryRoute = require("./routes/category/categoryRoute");

dotenv.config();

const app = express();

//DB
dbConnect();

//Middleware
app.use(express.json());

//cors
app.use(cors());

app.use(express.static("public"));

//user route
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/category", categoryRoute);

//server
const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
