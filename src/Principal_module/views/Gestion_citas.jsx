import React, { useState } from 'react';
import { 
    Button, TextField, Typography, Paper, 
    List, ListItem, ListItemText, Divider, Container, 
    MenuItem, Select, InputLabel, FormControl 
} from '@mui/material';
import NavigationBar from '../components/navegation_bar';
import './Gestion_citas.css';

const GestionCitas = () => {
    const [citas, setCitas] = useState([]);
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [horaCita, setHoraCita] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [doctorID, setDoctorID] = useState('');
    const [motivoCita, setMotivoCita] = useState('');
    const [estado, setEstado] = useState('Pendiente');
    const [numeroHistoriaClinica, setNumeroHistoriaClinica] = useState('');
    const [ticketCounter, setTicketCounter] = useState(1);

    // Simulación de la base de datos de pacientes
    const pacientesDB = [
        { nombre: 'Juan Pérez', numeroHistoriaClinica: 'HC-001', descripcion: 'Chequeo general' },
        { nombre: 'María López', numeroHistoriaClinica: 'HC-002', descripcion: 'Consulta de seguimiento' },
        // Más pacientes...
    ];

    const handleAgregarCita = () => {
        const nuevaCita = {
            ticket: `T-${ticketCounter.toString().padStart(4, '0')}`, 
            nombre,
            fecha,
            horaCita,
            descripcion,
            doctorID,
            motivoCita,
            estado,
            numeroHistoriaClinica
        };
        setCitas([...citas, nuevaCita]);
        setNombre('');
        setFecha('');
        setHoraCita('');
        setDescripcion('');
        setDoctorID('');
        setMotivoCita('');
        setEstado('Pendiente');
        setNumeroHistoriaClinica('');
        setTicketCounter(ticketCounter + 1);
    };

    // Autocompletar paciente si ya existe en la "base de datos"
    const handleBuscarPaciente = (e) => {
        const inputNombre = e.target.value;
        setNombre(inputNombre);

        const pacienteEncontrado = pacientesDB.find(p => p.nombre.toLowerCase() === inputNombre.toLowerCase());
        if (pacienteEncontrado) {
            setNumeroHistoriaClinica(pacienteEncontrado.numeroHistoriaClinica);
            setDescripcion(pacienteEncontrado.descripcion);
        } else {
            setNumeroHistoriaClinica('');
            setDescripcion('');
        }
    };

    return (
        <div className="gestion-citas-container">
            <nav className="navbar">
                <NavigationBar />
            </nav>
            <main className="main-content">
                <Container maxWidth="sm">
                    <Typography variant="h4" gutterBottom align="center">
                        Gestión de Citas
                    </Typography>
                    <Paper elevation={3} className="form-card">
                        <Typography variant="h6">Nueva Cita</Typography>

                        <TextField
                            fullWidth
                            label="Nombre del Paciente"
                            value={nombre}
                            onChange={handleBuscarPaciente} // Cambia a función de autocompletar
                            margin="normal"
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Doctor</InputLabel>
                            <Select
                                value={doctorID}
                                onChange={(e) => setDoctorID(e.target.value)}
                            >
                                <MenuItem value={1}>Dr. José Pérez</MenuItem>
                                <MenuItem value={2}>Dra. Ana González</MenuItem>
                                <MenuItem value={3}>Dr. Carlos Martínez</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Fecha de la Cita"
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            fullWidth
                            label="Hora de la Cita"
                            type="time"
                            value={horaCita}
                            onChange={(e) => setHoraCita(e.target.value)}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            fullWidth
                            label="Motivo de la Cita"
                            value={motivoCita}
                            onChange={(e) => setMotivoCita(e.target.value)}
                            margin="normal"
                        />

                        <TextField
                            fullWidth
                            label="Descripción"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            margin="normal"
                            multiline
                            rows={4}
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Estado</InputLabel>
                            <Select
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                            >
                                <MenuItem value="Pendiente">Pendiente</MenuItem>
                                <MenuItem value="Confirmada">Confirmada</MenuItem>
                                <MenuItem value="Cancelada">Cancelada</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Número de Historia Clínica"
                            value={numeroHistoriaClinica}
                            onChange={(e) => setNumeroHistoriaClinica(e.target.value)}
                            margin="normal"
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleAgregarCita}
                            className="add-button"
                        >
                            Agregar Cita
                        </Button>
                    </Paper>

                    <div className="citas-list-container">
                        <Typography variant="h6" gutterBottom>
                            Lista de Citas
                        </Typography>
                        <List>
                            {citas.map((cita, index) => (
                                <React.Fragment key={index}>
                                    <ListItem className="list-item">
                                        <ListItemText
                                            primary={`Ticket: ${cita.ticket} - ${cita.nombre}`}
                                            secondary={`Fecha: ${cita.fecha} | Hora: ${cita.horaCita} | Doctor ID: ${cita.doctorID} | Motivo: ${cita.motivoCita} | Estado: ${cita.estado} | Nro Historia Clínica: ${cita.numeroHistoriaClinica}`}
                                        />
                                    </ListItem>
                                    <Divider className="list-divider" />
                                </React.Fragment>
                            ))}
                        </List>
                    </div>
                </Container>
            </main>
        </div>
    );
};

export default GestionCitas;
