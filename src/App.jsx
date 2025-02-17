import "./App.css";

// import { Route, Router } from 'lucide-react'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutUs } from "./components/AboutUs";
import Blog from "./components/Blog";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import { Home } from "./components/HomePage/Home";
import OurTeam from "./components/HomePage/OurTeam";
import { NavBar } from "./components/NavBar";
import { OurProducts } from "./components/OurProducts";
import OurServices from "./components/OurServices";
import ProductDetail from "./components/ProductDetail";

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
