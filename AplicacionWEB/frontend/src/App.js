import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Importar los componentes
import Home from './components/Home';
import LoginDirectorEscuela from './components/LoginDirectorEscuela';
import LoginDirectorEstatal from './components/LoginDirectorEstatal';
import LoginProfesor from './components/LoginProfesor';
import RegisterAlumno from './components/RegisterAlumno';
import RegisterProfesor from './components/RegisterProfesor';
import RegisterDirectorEscuela from './components/RegisterDirectorEscuela';
import RegisterTutor from './components/RegisterTutor';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginDirectorEscuela" element={<LoginDirectorEscuela />} />
        <Route path="/LoginDirectorEstatal" element={<LoginDirectorEstatal />} />
        <Route path="/LoginProfesor" element={<LoginProfesor />} />
        <Route path="/RegisterAlumno" element={<RegisterAlumno />} />
        <Route path="/RegisterDirectorEscuela" element={<RegisterDirectorEscuela />} />
        <Route path="/RegisterProfesor" element={<RegisterProfesor />} />
        <Route path="/RegisterTutor" element={<RegisterTutor />} />

      </Routes>
    </Router>
  );
}

export default App;
