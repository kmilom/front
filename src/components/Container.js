import React from "react"; // Importa la librería React

// Componente contenedor que recibe elementos secundarios como props
const Container = ({children}) => {
    return(
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            {children} {/* Renderiza los elementos secundarios dentro del contenedor */}
        </div>
    );
}

export default Container; // Exporta el componente Container para su uso en otras partes de la aplicación
