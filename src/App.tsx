import { Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Discovery from "./pages/Discovery";
function App() {
  return (
    <div className="max-w-[86%] mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discovery />} />
      </Routes>
    </div>
  );
}

export default App
