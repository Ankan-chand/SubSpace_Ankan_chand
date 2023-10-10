const express = require("express");
const dotenv = require("dotenv");
const blogRoutes = require("./routes/blog");
const app = express();

if(process.env.NODE_ENV !== "production"){
    dotenv.config({path: "./config.env"})
}

//express middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//adding prefix to routes
app.use("/api", blogRoutes);

module.exports = app;