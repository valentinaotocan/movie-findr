import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Discovery from "./pages/Discovery";
import SearchResults from "./components/SearchResults";
import Details from "./components/Details";

function App() {
  return (
    <div className="max-w-[86%] mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discovery />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/details/:movie_id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App
