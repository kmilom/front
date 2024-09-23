import React from "react"; // Importa la librería React
import RegisterForm from "../components/RegisterForm"; // Importa el componente del formulario de registro
import Container from "../components/Container"; // Importa el componente contenedor

// Componente de la página de registro
const Register = () => {
    return(
        <Container> {/* Utiliza el contenedor para envolver el formulario de registro */}
            <RegisterForm /> {/* Renderiza el formulario de registro */}
        </Container>
    );
}

export default Register; // Exporta el componente Register para su uso en otras partes de la aplicación
