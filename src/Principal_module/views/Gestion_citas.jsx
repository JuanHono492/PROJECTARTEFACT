import React, { useState } from 'react';
import { 
    Button, TextField, Typography, Paper, 
    List, ListItem, ListItemText, Divider, Container 
} from '@mui/material';
import NavigationBar from '../components/navegation_bar';

const GestionCitas = () => {
    const [citas, setCitas] = useState([]);
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ticketCounter, setTicketCounter] = useState(1); // Control del número de ticket

    const handleAgregarCita = () => {
        const nuevaCita = {
            ticket: `T-${ticketCounter.toString().padStart(4, '0')}`, // Formato T-0001, T-0002...
            nombre,
            fecha,
            descripcion,
        };
        setCitas([...citas, nuevaCita]);
        setNombre('');
        setFecha('');
        setDescripcion('');
        setTicketCounter(ticketCounter + 1); // Incrementa el número del ticket
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <NavigationBar />
            </nav>
            <main className="main-content">
                <Container maxWidth="sm">
                    <Typography variant="h4" gutterBottom align="center">
                        Gestión de Citas
                    </Typography>
                    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                        <Typography variant="h6">Nueva Cita</Typography>
                        <TextField
                            fullWidth
                            label="Nombre del Paciente"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Fecha"
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
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
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleAgregarCita}
                            style={{ marginTop: '10px' }}
                        >
                            Agregar Cita
                        </Button>
                    </Paper>

                    <Typography variant="h6" gutterBottom>
                        Lista de Citas
                    </Typography>
                    <List>
                        {citas.map((cita, index) => (
                            <React.Fragment key={index}>
                                <ListItem>
                                    <ListItemText
                                        primary={`Ticket: ${cita.ticket} - ${cita.nombre}`}
                                        secondary={`Fecha: ${cita.fecha} | Descripción: ${cita.descripcion}`}
                                    />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </Container>
            </main>
        </div>
    );
};

export default GestionCitas;