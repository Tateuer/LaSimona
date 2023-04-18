import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AgregarTurno = (): JSX.Element => {
  const [nombre, setNombre] = useState<string>("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const turnosCollection = collection(db, "turnos");

  const createDoc = async () => {
    try {
      if (!nombre || !fecha || !hora) {
        toast.error("Por favor, complete todos los campos.");
        return;
      }
      await addDoc(turnosCollection, {
        title: nombre,
        start: `${fecha}T${hora}`,
      });
      toast.success("Turno agregado!");
      setNombre("");
      setFecha("");
      setHora("");

      window.location.reload();
    } catch (error) {
      console.error("Error al agregar el turno: ", error);
    }
  };

  return (
    <div>
      <div className="input-box">
        <input
          className="inputgeneral inputnombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
        />
      </div>
      <div className="input-box">
        <input
          className="inputgeneral"
          type="date"
          value={fecha.slice(0, 14)}
          onChange={(e) => setFecha(e.target.value)}
          placeholder="Fecha"
        />

        <input
          className="inputgeneral"
          placeholder="Hora"
          type="number"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          min="1" // Valor mínimo para las horas
          max="24" // Valor máximo para las horas
          onBlur={(e) => {
            const hours = parseInt(e.target.value);
            if (!isNaN(hours)) {
              // Verificar si el valor es un número válido
              setHora(hours < 10 ? `0${hours}:00` : `${hours}:00`); // Formatear el valor a "HH:00"
            }
          }}
          // className="inputgeneral"
          // type="time"
          // value={hora}
          // onChange={(e) => setHora(e.target.value)}
          // step="3600"
          // placeholder="Hora"
        />
        <button className="inputboton" onClick={createDoc}>
          Crear Turno
        </button>
      </div>
    </div>
  );
};

export default AgregarTurno;
