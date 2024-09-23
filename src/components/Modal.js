import React from 'react'; // Importa React

const Modal = ({ isOpen, closeModal, children }) => {
  // Si el modal no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Botón de Cerrar */}
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={closeModal}>
          {/* Icono de cerrar */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* Contenido del Modal */}
        <div className="mb-4 text-black grid justify-center">
          {children} {/* Renderiza los hijos que se pasan al modal */}
        </div>
      </div>
    </div>
  );
};

export default Modal; // Exporta el componente Modal
