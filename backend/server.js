const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const dbConnect = require("./config/db/dbConnect");
const usersRoute = require("./routes/user/userRoutes");
const productsRoute = require("./routes/products/productsRoute");
const categoryRoute = require("./routes/category/categoryRoute");
const cartRoute = require("./routes/cart/cartRoute");
const commentRoutes = require("./routes/comments/commentRoute");
const paymentRoute = require("./routes/payment/paymentRoute");
const notificationRouter = require("./routes/notification/notificationRoute");



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
app.use("/api/cart", cartRoute);
app.use("/api/comments", commentRoutes);
app.use("/api/payment", paymentRoute)
app.use("/api/sms", notificationRouter);

//server
const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
