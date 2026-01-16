import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useState } from "react";



function App() {
  const[keyword, setKeyword] = useState("");

  return (
    
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/item-details/:id" element={<ItemDetails />} />
        <Route path="/author/" element={<Author />} />
        <Route path="/item-details/" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;
