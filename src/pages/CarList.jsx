import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules"; 

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const authData = JSON.parse(localStorage.getItem("userInfo"));
        console.log(authData.token);
       const response = await axios.get(
         "http://localhost:4000/api/v1/cars",
         
         {
           headers: {
             "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${authData.token}`, 
           },
         }
       );
       console.log("res",response)
        if (response.data && response.data.length > 0) {
          setCars(response.data);
          setError("");
        } else {
          setError("No cars found. Please add a car to view it here.");
        }
      } catch (err) {
        setError("An error occurred while fetching cars.");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) {
    return <div className="p-4">Loading cars...</div>;
  }

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cars</h2>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : cars.length === 0 ? (
          <div className="text-gray-500">No cars available.</div>
        ) : (
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {cars.map((car) => (
              <SwiperSlide key={car.id}>
                <div className="border p-4 rounded bg-white shadow-md">
                  <h3 className="text-xl font-semibold">
                    {car.title || "Untitled"}
                  </h3>
                  <p className="text-gray-700">
                    {car.description || "No description available."}
                  </p>
                  {car.images && car.images.length > 0 ? (
                    <img
                      src={car.images[0]}
                      alt="Car"
                      className="mt-2 rounded w-full h-80 object-fit"
                    />
                  ) : (
                    <p className="text-gray-500">No image available</p>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <span className="text-yellow-50 mx-auto">SWIPE TO SEE OTHER CARS-></span>
    </>
  );
};

export default CarList;
