import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import NavigationBar from '../components/navegation_bar';
import CreateAppointment from './CreateAppointment';
import './CalendarView.css'; // Archivo CSS actualizado

const CalendarView = () => {
    const [citas, setCitas] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const fetchCitas = async () => {
        try {
            const response = await axios.get('/api/citas');
            const events = response.data.map((cita) => ({
                title: `${cita.MotivoCita} - ${cita.Paciente.Nombre} ${cita.Paciente.Apellido}`,
                start: `${cita.FechaCita}T${cita.HoraCita}`,
                allDay: false,
            }));
            setCitas(events);
        } catch (error) {
            console.error('Error al cargar citas:', error);
        }
    };

    useEffect(() => {
        fetchCitas();
    }, []);

    const handleDateClick = (info) => {
        setSelectedDate(info.dateStr);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setSelectedDate(null);
    };

    return (
        <div className="calendar-wrapper">
            <NavigationBar />
            <div className="calendar-container">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    events={citas}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    slotMinTime="08:00:00"
                    slotMaxTime="18:00:00"
                    dateClick={handleDateClick}
                />
            </div>
            {showForm && (
                <CreateAppointment
                    selectedDate={selectedDate}
                    onClose={closeForm}
                    onSave={() => {
                        closeForm();
                        fetchCitas();
                    }}
                />
            )}
            <button
                className="floating-create-button"
                onClick={() => setShowForm(true)}
            >
                + Crear Cita
            </button>
        </div>
    );
};

export default CalendarView
