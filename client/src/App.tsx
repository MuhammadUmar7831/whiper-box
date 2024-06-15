import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from './interface/Loading';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Message from "./interface/Message";
import Whisper from "./pages/Whisper";

function App() {

  return (
    <>
      <Loading />
      <Message />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/whisper/:username" element={<Whisper />} />
          <Route path="/u/:username" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
