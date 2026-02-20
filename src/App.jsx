import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Meal from "./pages/Meal";
import History from "./pages/History";
import Navbar from "./components/Navbar";

function App() {
  return(
    <BrowserRouter>
    <div className="min-h-screen bg-gray-900 text-white">
    <Navbar />
    <div className="max-w-5xl mx-auto p-4">
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="meal" element={<Meal/>}/>
      <Route path="history" element={<History/>}/>
    </Routes>
    </div>
    </div>
    </BrowserRouter>


  )
}

export default App;