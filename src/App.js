import React, { useReducer, useState, useEffect } from 'react';
import './App.css';

const initialState = {
  name: '',
  lastName: '',
  birthDate: '',
  address: '',
  phoneNumber: ''
};

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  };
};

function App() {
  const [formData, setFormData] = useReducer(formReducer, initialState);
  const [submitting, setSubmitting] = useState(false);
  const [showData, setShowData] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7);

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

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
    setShowData(true);
    setTimeLeft(7);
  };

  const handleChange = event => {
    setFormData({ name: event.target.name, value: event.target.value });
  };

  return (
    <div className="estilo">
      <h1>Registro de Estudiantes</h1>
      {showData ? (
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
        </div>
      ) : (
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

export default App;