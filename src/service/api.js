import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000/api/v1" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

export const signup = (formData) => API.post("/signup", formData);
export const login = (formData) => API.post("/login", formData);
export const createCar = (carData) => API.post("/cars", carData);
export const fetchCars = () => API.get("/cars");
export const updateCar = (id, carData) => API.put(`/cars/${id}`, carData);
export const deleteCar = (id) => API.delete(`/cars/${id}`);
