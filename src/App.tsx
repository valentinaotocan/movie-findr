import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Discovery from "./pages/Discovery";
import SearchResults from "./pages/SearchResults";
import Details from "./pages/Details";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discovery />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/details/:movie_id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
