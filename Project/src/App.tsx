
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Home from './compounds/Home'
import NotFound from './compounds/NotFound'
import Navbar from "./compounds/Navbar";
import Quotes from "./compounds/Quotes";

function App() {


  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<Quotes />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
