import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CarForm = () => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);

    URL.revokeObjectURL(previews[index]);

    setImages(updatedImages);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    const authData=JSON.parse(localStorage.getItem("userInfo"));
    
    console.log("Form Data:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/cars",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      toast.success("CAR UPLOADED")
      console.log("Car uploaded:", response.data);
    } catch (error) {
      console.error("Error uploading car:", error);
    }
  };

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-lg mx-auto space-y-4 bg-gray-800 rounded-lg shadow-lg"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      ></textarea>
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma-separated)"
        className="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <div className="flex flex-col items-center">
        <label className="w-full py-2 px-4 mb-2 cursor-pointer text-center text-yellow-500 border border-dashed border-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-gray-800">
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
          Select Images
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative group">
            <img
              src={preview}
              alt={`Preview ${index}`}
              className="w-full h-32 object-cover rounded-lg border border-gray-700"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 p-1 rounded-full bg-gray-800 text-red-500 opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 mt-4 bg-yellow-500 text-gray-800 font-semibold rounded-lg hover:bg-yellow-600 transition"
      >
        Upload Car
      </button>
    </form>
  );
};

export default CarForm;
