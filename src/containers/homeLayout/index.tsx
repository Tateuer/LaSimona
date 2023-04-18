import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AgregarTurno from "@/componentes/inputs";
import { db } from "../../services/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import esLocale from "@fullcalendar/core/locales/es";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface turnosType {
  title: string;
  start: string;
}

export default function DemoApp() {
  const [turnos, setTurnos] = useState<turnosType[]>([]);
  const [mes, setMes] = useState<number>();

  const fetchTurnos = async () => {
    const turnosCollection = collection(db, "turnos");
    const turnosSnapshot = await getDocs(turnosCollection);

    const turnosData = turnosSnapshot.docs.map((doc) => ({
      title: doc.data().title,
      start: doc.data().start,
      id: doc.id,
      interactive: true,
    }));
    setTurnos(turnosData);
  };

  useEffect(() => {
    fetchTurnos();
  }, []);

  const handleDeleteEvent = async (id: string) => {
    try {
      const docRef = doc(db, "turnos", String(id));
      await deleteDoc(docRef);

      toast.success("Turno eliminado!");
      fetchTurnos();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Error: " + error.message);
      } else {
        toast.error("Error desconocido");
      }
    }
  };

  const handlerSumaMes = (e: string) => {
    const turnosPorMes = turnos.filter((t) => t.start.slice(0, 7) === e);
    setMes(turnosPorMes.length);
  };

  return (
    <div className="div-mayor">
      <div className="encierra-todo">
        <div className="pelota"></div>
        <h3 className="la-simonatext">LA SIMONA</h3>
      </div>
      <AgregarTurno />
      <div className="turnoscontadordiv">
        <input
          className="input-mes"
          type="month"
          value={mes}
          onChange={(e) => handlerSumaMes(e.target.value)}
          placeholder="Mes"
        />
      </div>
      <p className="contador">Turnos en el mes: {mes}</p>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        locale={esLocale}
        initialView={"timeGridDay"}
        headerToolbar={{
          start: "title",
          end: "today,prev,next,dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventContent={(eventInfo) => {
          return (
            <div className="eventodiv">
              <span>{eventInfo.event.title}</span>
              <button onClick={() => handleDeleteEvent(eventInfo.event.id)}>
                X
              </button>
            </div>
          );
        }}
        events={turnos}
      />
    </div>
  );
}
