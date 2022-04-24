import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Manufacturers from "./pages/Manufacturers";
import Navbar from "./Navbar";
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
                    path="/cars"
                    element={
                        <div className="page-container">
                            <Navbar></Navbar>
                            <Cars></Cars>
                        </div>
                    }
                ></Route>
                <Route
                    exact
                    path="/manufacturers"
                    element={
                        <div className="page-container">
                            <Navbar></Navbar>
                            <Manufacturers></Manufacturers>
                        </div>
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
