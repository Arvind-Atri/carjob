const express=require("express");
const mongoose=require("mongoose");
const { connect } = require("./config/dbConfig");
const app=express();
require("dotenv").config();
const cors=require("cors")

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
const routes=require("./routes/routes");
// const { cloudinaryConnect } = require("./config/cloudinary");
app.use("/api/v1",routes);

const PORT=process.env.PORT||5000;
connect();
// cloudinaryConnect();
app.listen(PORT,()=>{
    console.log(`Running at ${PORT}`);
})