router.post("/cars", upload.array("images", 10), async (req, res) => {
  try {
    const imageUrls = [];

    // Loop through each file and upload it to Cloudinary
    for (const file of req.files) {
      const base64Image = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(base64Image, {
        folder: "car-images",
        resource_type: "image",
      });

      imageUrls.push(result.secure_url); // Store the Cloudinary URL
    }

    // Create a new Car object in MongoDB with image URLs
    const newCar = new Car({
      userId: req.userId,
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags ? req.body.tags.split(",") : [],
      images: imageUrls,
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ message: "Error uploading images", error });
  }
});
