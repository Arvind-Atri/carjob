


// uploadCar ....
// fetchAllDetail
// fetchDetail
// updateDetail
// deleteDetail

const Car = require("../models/Car");
const User=require("../models/userModel")

exports.uploadCar=async(req,res)=>{
   try {
     // Collect all the image URLs

     
     const imageUrls = req.files.map((file) => file.path);

     
    console.log("URLS",imageUrls);
     const newCar = new Car({
       user: req.user.id,    //Needs Change
       title: req.body.title,
       description: req.body.description,
       tags: req.body.tags ,
       images: imageUrls, // Store Cloudinary URLs
     });


     console.log("NEWCAR",newCar);
     const carData=await newCar.save();

    //  console.log(carData);
     const updatedUser = await User.findByIdAndUpdate(
       newCar.user,
       { $push: { cars: newCar._id } },
       { new: true }
     ).populate("cars").exec();


     console.log(updatedUser);

     res.status(201).json(newCar);
   } catch (error) {
     res.status(500).json({ message: "Error uploading images", error });
   }

}


exports.listCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cars" });
  }
};




exports.searchCars = async (req, res) => {
  console.log("SEARCHING")
  const { query } = req.query;
  try {
    const cars = await Car.find({
      user: req.user.id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error searching cars" });
  }
};
