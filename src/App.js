import React, { useReducer, useState, useEffect } from 'react';
import './App.css';

// Definimos el estado inicial del formulario
const initialState = {
  name: '',
  lastName: '',
  birthDate: '',
  address: '',
  phoneNumber: ''
};

// Definimos un reductor para manejar las acciones del formulario
const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  };
};

// Definimos el componente App
function App() {
  // Utilizamos el hook useReducer para manejar el estado del formulario
  const [formData, setFormData] = useReducer(formReducer, initialState);
  // Utilizamos el hook useState para manejar el estado de envío y mostrar la información
  const [submitting, setSubmitting] = useState(false);
  const [showData, setShowData] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7);

  // Utilizamos el hook useEffect para manejar el efecto secundario de mostrar la información durante 7 segundos
  useEffect(() => {
    let timer;
    if (submitting) {
      timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft === 1) {
            clearInterval(timer);
            setShowData(false);
            setSubmitting(false);
            setFormData(initialState);
            return 7; // Reiniciamos el contador a 7 segundos
          } else {
            return prevTimeLeft - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [submitting, setFormData, initialState]);

  // Definimos la función handleSubmit para manejar el envío del formulario
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
    setShowData(true);
    setTimeLeft(7);
  };

  // Definimos la función handleChange para manejar los cambios en el formulario
  const handleChange = event => {
    setFormData({ name: event.target.name, value: event.target.value });
  };

  // Renderizamos el componente
  return (
    <div className="estilo">
      <h1>Registro de Estudiantes</h1>
      {showData ? (
        // Si showData es verdadero (se activa showData por 7 segundos), mostramos la información del estudiante y el tiempo restante
        <div>
          <h2>Información del Estudiante:</h2>
          <ul>
            {Object.entries(formData).map(([key, value]) => (
              <li key={`${key}-${value}`}>
                <strong>{key && key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{' '}
                {value.toString()}
              </li>
            ))}
          </ul>
          <p>Tiempo restante para ocultar la información: {timeLeft} segundos</p>
        </div> // Definicion del temporizador en el DOM
      ) : (
        // Si showData es falso, mostramos el formulario
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              <p>Nombres</p>
              <input name="name" onChange={handleChange} value={formData.name} />
            </label>
            <label>
              <p>Apellidos</p>
              <input name="lastName" onChange={handleChange} value={formData.lastName} />
            </label>
            <label>
              <p>Fecha de Nacimiento</p>
              <input name="birthDate" type="date" onChange={handleChange} value={formData.birthDate} />
            </label>
            <label>
              <p>Dirección</p>
              <input name="address" onChange={handleChange} value={formData.address} />
            </label>
            <label>
              <p>Teléfono</p>
              <input name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} />
            </label>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

// Exportamos el componente App
export default App;