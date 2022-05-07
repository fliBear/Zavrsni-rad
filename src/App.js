import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Manufacturers from "./pages/Manufacturers";
import Navbar from "./Navbar";
import Car from "./pages/Car";
import "./styles/styles.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <div className="page-container">
                            <Navbar></Navbar>
                            <Home></Home>
                        </div>
                    }
                ></Route>
                <Route
                    exact
                    path="/HAL-Forms/cars"
                    element={
                        <div className="page-container">
                            <Navbar></Navbar>
                            <Cars></Cars>
                        </div>
                    }
                ></Route>
                <Route
                    exact
                    path="/HAL-Forms/manufacturers"
                    element={
                        <div className="page-container">
                            <Navbar></Navbar>
                            <Manufacturers></Manufacturers>
                        </div>
                    }
                ></Route>
                <Route
                    exact
                    path="/HAL-Forms/car/:id"
                    element={
                        <div className="page-container">
                            <Navbar></Navbar>
                            <Car></Car>
                        </div>
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
