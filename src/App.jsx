import "./App.css";

// import { Route, Router } from 'lucide-react'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutUs } from "./Components/AboutUs";
import Blog from "./Components/Blog";
import ContactUs from "./Components/ContactUs";
import Footer from "./Components/Footer";
import { Home } from "./Components/HomePage/Home";
import OurTeam from "./Components/HomePage/OurTeam";
import NavBar from "./Components/NavBar";
import { OurProducts } from "./Components/OurProducts";
import OurServices from "./Components/OurServices";
import ProductDetail from "./Components/ProductDetail";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <NavBar />
        </div>
        <div className="  w-full mt-14">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<OurServices />} />
            <Route path="/ourproducts" element={<OurProducts />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/ourteam" element={<OurTeam />} />
            <Route path="/product-detail/:title" element={<ProductDetail />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
