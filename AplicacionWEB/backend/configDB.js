const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        return;
    }
    console.log('Coectado a MySQL \n');

    const dbName = process.env.DB_NAME || 'PRONIM';

    connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`, (err) => {
        if (err) throw err;
        console.log(`Database ${dbName} creada o ya existia. \n`);
        connection.query(`USE \`${dbName}\`;`, (err) => {
            if (err) throw err;

            // Módulo 1: Tablas de catálogos
            const queries = [
                {
                    name: 'Tabla sexo',
                    query: `
                        CREATE TABLE IF NOT EXISTS Sexo (
                            Nombre VARCHAR(50) PRIMARY KEY,
                            Descripcion VARCHAR(255)
                        );
                    `
                },
                {
                    name: 'Tabla estado',
                    query: `
                        CREATE TABLE IF NOT EXISTS Estado (
                            ID_Estado INT PRIMARY KEY AUTO_INCREMENT,
                            Nombre VARCHAR(100)
                        );
                    `
                },
                {
                    name: 'Tabla formacion',
                    query: `
                        CREATE TABLE IF NOT EXISTS Formacion (
                            ID_Formacion INT PRIMARY KEY AUTO_INCREMENT,
                            Nombre_Formacion VARCHAR(100)
                        );
                    `
                },
                {
                    name: 'Tabla grado',
                    query: `
                        CREATE TABLE IF NOT EXISTS Grado (
                            ID_Grado INT PRIMARY KEY AUTO_INCREMENT,
                            Nombre_Grado VARCHAR(100),
                            ID_Formacion INT
                        );
                    `
                },
                {
                    name: 'Tabla Parentesco ',
                    query: `
                        CREATE TABLE IF NOT EXISTS Parentesco (
                            ID_Parentesco INT PRIMARY KEY,
                            Descripcion VARCHAR(255)
                        );
                    `
                },
                {
                    name: 'Tabla idiomas',
                    query: `
                        CREATE TABLE IF NOT EXISTS Idiomas (
                            ID_Idiomas INT PRIMARY KEY AUTO_INCREMENT,
                            Nombre_Idioma VARCHAR(100)
                        );
                    `
                },
                {
                    name: 'Tabla Materiales',
                    query: `
                        CREATE TABLE IF NOT EXISTS Materiales (
                            ID_Materiales INT PRIMARY KEY AUTO_INCREMENT,
                            Descripcion VARCHAR(255) NOT NULL
                        );
                    `
                }, 
                {
                    name: 'Tabla Condicion  ',
                    query: `
                        CREATE TABLE IF NOT EXISTS Condicion (
                        ID_Condicion INT PRIMARY KEY AUTO_INCREMENT,
                        Descripcion VARCHAR(255) NOT NULL
                    );
                    `
                }, 
                {
                    name: 'Tabla habilidades',
                    query: `
                        CREATE TABLE IF NOT EXISTS Habilidades (
                            ID_Habilidad INT PRIMARY KEY AUTO_INCREMENT,
                            Nombre_Habilidad VARCHAR(100),
                            Descripcion_Habilidad VARCHAR(255)
                        );
                    `
                },
                {
                    name: 'Tabla escolaridad',
                    query: `
                        CREATE TABLE IF NOT EXISTS Escolaridad (
                            ID_Escolaridad INT PRIMARY KEY AUTO_INCREMENT,
                            Nombre VARCHAR(100),
                            Descripcion VARCHAR(255)
                        );
                    `
                },
                {
                    name: 'Tabla condicion migratoria',
                    query: `
                        CREATE TABLE IF NOT EXISTS Condicion_Migratoria (
                            Id_condicion INT PRIMARY KEY AUTO_INCREMENT,
                            Descripcion VARCHAR(255),
                            Nombre VARCHAR(100)
                        );
                    `
                },
                {
                    name: 'Tabla Tipo_nota',
                    query: `
                        CREATE TABLE IF NOT EXISTS Tipo_Nota (
                            Id_TN INT PRIMARY KEY AUTO_INCREMENT,
                            Tipo_Nota VARCHAR(100),
                            Prioridad Int
                        );
                    `
                },
                {
                    name: 'Tabla nacionalidad',
                    query: `
                        CREATE TABLE IF NOT EXISTS Nacionalidad (
                            Id_nacionalidad INT PRIMARY KEY AUTO_INCREMENT,
                            Nombre VARCHAR(100)
                        );
                    `
                },
                {
                    name: 'Tabla origen etnico',
                    query: `
                        CREATE TABLE IF NOT EXISTS Origen_Etnico (
                            Id_origen INT PRIMARY KEY AUTO_INCREMENT,
                            Nombre VARCHAR(100),
                            Descripcion VARCHAR(255)
                        );
                    `
                },
                {
                    name: 'Tabla Materia',
                    query: `
                        CREATE TABLE IF NOT EXISTS Materia (
                            ID_Materia INT PRIMARY KEY AUTO_INCREMENT,
                            Nombre_materia VARCHAR(100),
                            Id_Grado INT,
                            FOREIGN KEY (Id_Grado) REFERENCES Grado(ID_Grado)
                        );
                    `
                },
                {
                    name: 'Tabla Plan_de_Estudio',
                    query: `
                        CREATE TABLE IF NOT EXISTS Plan_de_Estudio (
                                ID_Plan_de_Estudio INT PRIMARY KEY AUTO_INCREMENT,
                                ID_Materia INT,
                                Inicio_Vigencia DATE,
                                Termino_Vigencia DATE,
                                FOREIGN KEY (ID_Materia) REFERENCES Materia(ID_Materia)
                        );
                    `
                },
                {
                    name: 'Tabla Tema ',
                    query: `
                        CREATE TABLE IF NOT EXISTS Tema (
                                    ID_Tema INT PRIMARY KEY AUTO_INCREMENT,
                                    ID_Plan_de_Estudio INT,
                                    Nombre_tema VARCHAR(100),
                                    ID_Habilidad INT,
                                    FOREIGN KEY (ID_Plan_de_Estudio) REFERENCES Plan_de_Estudio(ID_Plan_de_Estudio),
                                    FOREIGN KEY (ID_Habilidad) REFERENCES Habilidades(ID_Habilidad)
                        );
                    `
                },
                // Módulo 2: Crear tablas de usuarios y roles
                {
                    name: 'Tabla usuario',
                    query: `
                        CREATE TABLE IF NOT EXISTS Usuario (
                            ID INT PRIMARY KEY AUTO_INCREMENT,
                            Nombre VARCHAR(50) NOT NULL,
                            Primer_Apellido VARCHAR(50) NOT NULL,
                            Segundo_Apellido VARCHAR(50),
                            Fecha_de_nacimiento DATE NOT NULL,
                            Contraseña VARCHAR(255) NOT NULL,
                            CURP VARCHAR(18),
                            Activo BOOLEAN NOT NULL,
                            Sexo VARCHAR(50),
                            Fotografía BLOB,
                            FOREIGN KEY (Sexo) REFERENCES Sexo(Nombre)
                        );
                    `
                },
                {
                    name: 'Tabla usuario adulto',
                    query: `
                        CREATE TABLE IF NOT EXISTS Usuario_Adulto (
                            ID INT PRIMARY KEY AUTO_INCREMENT,
                            RFC VARCHAR(20),
                            Cedula_Profesional VARCHAR(20),
                            Correo VARCHAR(100),
                            FOREIGN KEY (ID) REFERENCES Usuario(ID)
                        );
                    `
                },
                {
                    name: 'Tabla centro de trabajo',
                    query: `
                        CREATE TABLE IF NOT EXISTS Centro_de_trabajo (
                            ID_CT INT PRIMARY KEY AUTO_INCREMENT,
                            Calle VARCHAR(100),
                            Numero VARCHAR(10),
                            Colonia VARCHAR(100),
                            Municipio VARCHAR(100),
                            ID_Estado INT,
                            ID_Formacion INT,
                            FOREIGN KEY (ID_Estado) REFERENCES Estado(ID_Estado),
                            FOREIGN KEY (ID_Formacion) REFERENCES Formacion(ID_Formacion)
                        );
                    `
                },  
                {
                    name: 'Tabla Clave Centro de Trabajo (CCT)',
                    query: `
                        CREATE TABLE IF NOT EXISTS CCT (
                            CCT VARCHAR(100) PRIMARY KEY,
                            Id_CCT INT,
                            Prestado BOOLEAN,
                            FOREIGN KEY (ID_CCT) REFERENCES Centro_de_trabajo(ID_CT)
                        );
                    `
                },   
                {
                    name: 'Tabla Clave Prestamos Clave Centro de Trabajo (PCCT)',
                    query: `
                        CREATE TABLE IF NOT EXISTS Prestamos_CCT (
                        inicio_prestamo DATE,
                        fin_prestamo DATE,
                        Receptor INT,
                        CCT VARCHAR(50),
                        FOREIGN KEY (CCT) REFERENCES CCT(CCT),
                        FOREIGN KEY (Receptor) REFERENCES Centro_de_trabajo(ID_CT)
                    );
                    `
                }, 
                {
                    name: 'Tabla Notificaciones ',
                    query: `
                        CREATE TABLE IF NOT EXISTS Notificaciones (
                        Id_noti INT PRIMARY KEY AUTO_INCREMENT,
                        fecha_notificacion DATE,
                        descripcion VARCHAR(255),
                        id_usuario INT,
                        estado BOOLEAN,
                        FOREIGN KEY (id_usuario) REFERENCES Usuario(ID)
                    );

                    `
                },
                {
                    name: 'Tabla profesor',
                    query: `
                        CREATE TABLE IF NOT EXISTS Profesor (
                        ID INT PRIMARY KEY AUTO_INCREMENT,
                        ID_CT INT,
                        FOREIGN KEY (ID) REFERENCES Usuario_Adulto(ID),
                        FOREIGN KEY (ID_CT) REFERENCES Centro_de_trabajo(ID_CT)
                    );
                    `
                },
                {
                    name: 'Tabla Coordinador_Nacional',
                    query: `
                        CREATE TABLE IF NOT EXISTS Coordinador_Nacional (
                                ID INT PRIMARY KEY,
                                ID_Estado INT,
                                Fecha_inicio DATE,
                                Fecha_fin DATE,
                                FOREIGN KEY (ID) REFERENCES Usuario_Adulto(ID),
                                FOREIGN KEY (ID_Estado) REFERENCES Estado(ID_Estado)
                        );
                    `
                },
                {
                    name: 'Tabla Grupo',
                    query: `
                        CREATE TABLE IF NOT EXISTS Grupo  (
                            ID_Grupo INT PRIMARY KEY AUTO_INCREMENT,
                            ID_Profesor INT,
                            ID_Grado INT,
                            ID_Materia INT DEFAULT NULL,
                            FOREIGN KEY (ID_Grado) REFERENCES Grado(ID_Grado),
                            FOREIGN KEY (ID_Materia) REFERENCES Materia(ID_Materia),
                            FOREIGN KEY (ID_Profesor) REFERENCES Profesor(ID)
                        );
                    `
                },
                {
                    name: 'Tabla Director ',
                    query: `
                        CREATE TABLE IF NOT EXISTS Director  (
                        ID_Profesor INT,
                        ID_CT INT,
                        Fecha_Inicio DATE,
                        Fecha_Fin DATE,
                        PRIMARY KEY (ID_CT, ID_Profesor),
                        FOREIGN KEY (ID_CT) REFERENCES Centro_de_trabajo(ID_CT),
                        FOREIGN KEY (ID_Profesor) REFERENCES Profesor(ID)
                    );
                    `
                },
                {
                    name: 'Tabla Salon  ',
                    query: `
                        CREATE TABLE IF NOT EXISTS Salon   (
                            ID_Salon INT PRIMARY KEY,
                            ID_CT INT,
                            ID_Condicion INT,
                            ID_Materiales INT,
                            Construccion VARCHAR(255),
                            FOREIGN KEY (ID_CT) REFERENCES Centro_de_trabajo(ID_CT),
                            FOREIGN KEY (ID_Condicion) REFERENCES Condicion(ID_Condicion),
                            FOREIGN KEY (ID_Materiales) REFERENCES Materiales(ID_Materiales)
                        );
                    `
                },
                {
                    name: 'Tabla Tutor ',
                    query: `
                        CREATE TABLE IF NOT EXISTS Tutor(
                                Id_tutor INT PRIMARY KEY,
                                Nombre VARCHAR(100),
                                Primer_Apellido VARCHAR(100),
                                Segundo_Apellido VARCHAR(100),
                                id_sexo VARCHAR(50),
                                fecha_de_nacimiento DATE,
                                curp VARCHAR(18),
                                id_origen_etnico INT,
                                id_idiomas INT,
                                id_condicion_migratoria INT,
                                id_escolaridad INT,
                                FOREIGN KEY (id_sexo) REFERENCES Sexo(Nombre),
                                FOREIGN KEY (id_origen_etnico) REFERENCES Origen_Etnico(Id_origen),
                                FOREIGN KEY (id_idiomas) REFERENCES Idiomas(ID_idiomas),
                                FOREIGN KEY (id_condicion_migratoria) REFERENCES Condicion_Migratoria(Id_condicion),
                                FOREIGN KEY (id_escolaridad) REFERENCES Escolaridad(Id_escolaridad)
                        );
                    `
                },
                {
                    name: 'Tabla alumno',
                    query: `
                        CREATE TABLE IF NOT EXISTS Alumno (
                            ID INT PRIMARY KEY AUTO_INCREMENT,
                            Nombre VARCHAR(50) NOT NULL,
                            Primer_Apellido VARCHAR(50) NOT NULL,
                            Segundo_Apellido VARCHAR(50),
                            Fecha_de_nacimiento DATE NOT NULL,
                            CURP VARCHAR(18),
                            Activo BOOLEAN NOT NULL,
                            Sexo VARCHAR(50),
                            ID_Grupo_actual INT NOT NULL,
                            ID_Grupo_anterior INT DEFAULT NULL,
                            ID_Condicion INT,
                            ID_Nacionalidad INT,
                            ID_Origen_Etnico INT,
                            FOREIGN KEY (Sexo) REFERENCES Sexo(Nombre),
                            FOREIGN KEY (ID_Condicion) REFERENCES Condicion_Migratoria(Id_condicion),
                            FOREIGN KEY (ID_Nacionalidad) REFERENCES Nacionalidad(Id_nacionalidad),
                            FOREIGN KEY (ID_Grupo_actual) REFERENCES Grupo(Id_Grupo),
                            FOREIGN KEY (ID_Grupo_anterior) REFERENCES Grupo(Id_Grupo),
                            FOREIGN KEY (ID_Origen_Etnico) REFERENCES Origen_Etnico(Id_origen)
                        );
                    `
                },
                {
                    name: 'Tabla Tutor_Alumno ',
                    query: `
                        CREATE TABLE IF NOT EXISTS Tutor_Alumno  (
                             ID_Alumno INT,
                            ID_Tutor INT,
                            ID_Parentesco INT,
                            PRIMARY KEY (ID_Alumno, ID_Tutor),
                            FOREIGN KEY (ID_Alumno) REFERENCES Alumno(ID),
                            FOREIGN KEY (ID_Tutor) REFERENCES Tutor(Id_tutor),
                            FOREIGN KEY (ID_Parentesco) REFERENCES Parentesco(ID_Parentesco)
                        );
                    `
                },
                {
                    name: 'Tabla usuario Calificacion ',
                    query: `
                        CREATE TABLE IF NOT EXISTS Calificacion (
                            Id_Calificacion INT PRIMARY KEY,
                            Calificacion DECIMAL(5,2),
                            ID_Alumno INT,
                            ID_grado INT,
                            ID_materia INT,
                            Bimestre INT,
                            FOREIGN KEY (ID_grado) REFERENCES Grado(ID_Grado),
                            FOREIGN KEY (ID_Alumno) REFERENCES Alumno(ID),
                            FOREIGN KEY (ID_materia) REFERENCES Materia(ID_Materia)
                        );
                    `
                },
                {
                    name: 'Tabla usuario Notas',
                    query: `
                        CREATE TABLE IF NOT EXISTS Notas (
                            ID_Nota INT PRIMARY KEY,
                            ID_Profesor INT,
                            ID_Alumno INT,
                            Nota DECIMAL(5,2),
                            ID_Tipo_Nota INT,
                            Fecha_Creación DATE,
                            FOREIGN KEY (ID_Tipo_Nota) REFERENCES Tipo_Nota(Id_TN),
                            FOREIGN KEY (ID_Profesor) REFERENCES Profesor(ID),
                            FOREIGN KEY (ID_Alumno) REFERENCES Alumno(ID)
                        );
                    `
                }
            ];

            // Ejecutar las consultas por separado
            queries.forEach(({ name, query }) => {
                connection.query(query, (err) => {
                    if (err) {
                        console.error(`Error ejecutando el query en ${name}:`, err.message);
                        throw err;
                    }
                    console.log(`Table ${name} creada o ya existia.`);
                });
            });

            console.log('Todas las tablas ya existian o creadas.\n');
            connection.end();
        });
    });
});

module.exports = connection;
