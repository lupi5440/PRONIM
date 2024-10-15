import React from 'react';

const Home = () => {
    return (
        <div>
            <h2>Bienvenido a la Aplicación</h2>
            <a href="/LoginDirectorEscuela">Iniciar Sesión como Director de Escuela</a>
            <br />
            <a href="/LoginDirectorEstatal">Iniciar Sesión como Director Estatal</a>
            <br />
            <a href="/LoginProfesor">Iniciar Sesión como Profesor</a>
            <br />
            <a href="/RegisterAlumno">Registrarse como Alumno</a>
            <br />
            <a href="/RegisterProfesor">Registrarse como Profesor</a>
            <br />
            <a href="/RegisterDirectorEscuela">Registrarse como Director de Escuela</a>
            <br />
            <a href="/RegisterTutor">Registrarse como Tutor</a>
        </div>
    );
};

export default Home;
