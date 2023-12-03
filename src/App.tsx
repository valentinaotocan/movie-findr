import { Routes, Route } from "react-router-dom";

import Home from './pages/Home';
function App() {
  return (
    <div className='max-w-[86%] mx-auto'>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
