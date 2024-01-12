import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import style from './Landing.module.css';

const Landing = () => {
  const clientID = "867613691740-ma0a3o85hkh4b6fcfes9uduu04hgvoq5.apps.googleusercontent.com";
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/home');
  };

  const onSuccess = (response) => {
    setUser(response.profileObj);
    openModal();
  }

  const onFailure = () => {
    console.log("Algo salió mal");
  }

  return (
    <div className={style.contenedor}>
      <h1>Countries Dreams</h1>
      <GoogleLogin
        clientId={clientID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_policy"}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Bienvenida"
        style={{
          content: {
            width: '45%', // Ancho del modal
            margin: 'auto', // Centrar el modal horizontalmente
            maxHeight: '25%', // Altura máxima del modal
            overflow: 'auto', // Habilitar el desplazamiento si el contenido es demasiado grande
            backgroundColor: 'rgba(213, 172, 78, 0.5)',
            top:"10%",
            border:"none"
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Color de fondo del overlay
            backdropFilter: 'blur(6px)', // Ajusta el valor según tus preferencias
          },
        }}
        

      >
        <h2 style={{ color: '#632E12' }}>Bienvenido a Countries Dreams, {user.name}!</h2>
  <p style={{ color: 'white', fontWeight: 'bold' }}>¡Conoce el país más poblado, ordénalos alfabéticamente, crea actividades y más!</p>
        <button onClick={closeModal}
         style={{
          backgroundColor: 'rgba(213, 172, 78, 0.5)', // Cambia el color de fondo del botón
          color: 'white', // Cambia el color del texto del botón
          padding: '8px', // Añade espaciado interno al botón
          borderRadius: '10px', // Añade bordes redondeados al botón
          cursor: 'pointer', // Cambia el cursor al pasar el ratón sobre el botón
          border:"none",
          margin: 'auto', // Centra el botón horizontalmente
          display: 'block',
          fontWeight: 'bold'
         
        }}
        >Continuar</button>
      </Modal>
    </div>
  );
};

export default Landing;
