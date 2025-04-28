import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
