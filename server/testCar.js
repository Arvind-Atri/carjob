require("dotenv").config();
const mongoose = require("mongoose");
const Car = require("./models/Car"); // Adjust the path as necessary

mongoose
  .connect(process.env.MONGO_URI, {
    
  })
  .then(async () => {
    console.log("MongoDB connected");

    try {
      const newCar = new Car({
        user: "6735e418b7a177183fd3a1e8", // Replace with a valid user ID from your database
        title: "Test Car Title",
        description: "Test Car Description",
        tags: ["sedan", "new"],
        images: [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg",
        ],
      });

      const savedCar = await newCar.save();
      console.log("Car created successfully:", savedCar);
      mongoose.connection.close();
    } catch (error) {
      console.error("Error creating car:", error);
      mongoose.connection.close();
    }
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
