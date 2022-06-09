import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Manufacturers from "./pages/Manufacturers";
import Navbar from "./Navbar";
import Car from "./pages/Car";
import Manufacturer from "./pages/Manufacturer";
import "./styles/styles.css";
import { useEffect, useState } from "react";
import { follow } from "./hef/hef";

function App() {
    const [links, setLinks] = useState({});

    useEffect(async () => {
        let linkData = {};
        let carsPages = await follow("http://localhost:8080", "cars-pages");
        carsPages = carsPages[1].split("/");
        carsPages[carsPages.length - 1] = ":id";
        carsPages = carsPages.join("/");
        linkData["carsPages"] = carsPages;
        //manufacturers
        let manufacturers = await follow(
            "http://localhost:8080",
            "manufacturers"
        );
        linkData["manufacturers"] = manufacturers[1];
        setLinks(linkData);
    }, []);

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
                    path={links["carsPages"]}
                    element={
                        <div className="page-container">
                            <Navbar></Navbar>
                            <Cars></Cars>
                        </div>
                    }
                ></Route>
                <Route
                    exact
                    path={links["manufacturers"]}
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
                <Route
                    exact
                    path="/HAL-Forms/manufacturer/:id"
                    element={
                        <div className="page-container">
                            <Navbar></Navbar>
                            <Manufacturer></Manufacturer>
                        </div>
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
