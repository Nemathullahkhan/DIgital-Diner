import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Header from "./components/Header";
import Checkout from "./pages/Checkout.jsx";

function App() {
  return (
    <>
      
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
    </>
  );
}

export default App;
