import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';

import CarList from './pages/CarList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="w-screen h-screen bg-richblack-900  flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />

      <Routes>
        <Route path="/" element={<CarList isLoggedIn={isLoggedIn} />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              {" "}
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App
