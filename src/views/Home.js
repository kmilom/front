import React from "react"; // Importa la librería React
import LoginForm from "../components/LoginForm"; // Importa el componente de formulario de inicio de sesión
import Container from "../components/Container"; // Importa el componente contenedor

// Componente de la página de inicio
const Home = () => {
    return(
        <Container> {/* Utiliza el contenedor para envolver el formulario */}
            <LoginForm /> {/* Renderiza el formulario de inicio de sesión */}
        </Container>
    );
}

export default Home; // Exporta el componente Home para su uso en otras partes de la aplicación
