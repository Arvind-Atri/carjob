const express=require("express");
const { signup, login } = require("../controllers/Auth");
const upload = require("../config/multer");
const { uploadCar, listCars, searchCars } = require("../controllers/Cars");
const router=express.Router();
const Car=require("../models/Car");
const { auth } = require("../middlewares/auth");





// User Routes
router.post("/signup",signup)
router.post("/login",login);


// Car Routes

router.post("/cars",auth, upload.array("images", 10), uploadCar);
router.get("/cars", auth, listCars);
router.get("/searchcars", auth, searchCars);
// router.put("/cars/:id",auth,updateDetail)
// router.delete("/cars/:id",auth,deleteDetail)

module.exports=router;