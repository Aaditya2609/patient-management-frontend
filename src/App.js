
import { Route, Routes } from 'react-router-dom';
import './App.css';
import PatientPage from './Pages/PatientPage';
import WardPage from './Pages/WardPage';
import HospitalPage from './Pages/HospitalPage';
import Nav from './Components/Nav';
import LinksPage from './Pages/LinksPage';

function App() {
  return (
    <div className="w-full text-center flex justify-between">
      <Nav />
      <div className="w-full">
        <Routes>
          <Route path="/" element={<PatientPage />} />
          <Route path="/ward" element={<WardPage />} />
          <Route path="/hospital" element={<HospitalPage />} />
          <Route path="/links" element={<LinksPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
