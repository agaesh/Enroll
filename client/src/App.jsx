// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import ProgramList from './pages/Program';


function App() {
  return (
      <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/programs" element={<ProgramList></ProgramList>} />"
      </Routes>
  )
}

export default App
