import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Header from "./components/Header";
import Checkout from "./pages/Checkout.jsx";
import { MyOrders } from "./pages/MyOrders.jsx";

function App() {
  return (
    <>
      
        <div className="min-h-screen bg-zinc-100">
        <Header />
        <Routes >
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/myorders" element={<MyOrders/>} />
        </Routes>
        </div>
    </>
  );
}

export default App;
