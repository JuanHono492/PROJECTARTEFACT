import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HistoryIcon from '@mui/icons-material/History';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function TopNavigationBar() {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { label: 'Gestión de Citas', path: '/gestion-citas', icon: <EventNoteIcon /> },
    { label: 'Historial Clínico', path: '/historial-clinico', icon: <HistoryIcon /> },
    { label: 'Historial de Reportes', path: '/generacion-reportes', icon: <AssessmentIcon /> },
    { label: 'Creación de Nuevo Usuario', path: '/gestion-usuarios', icon: <PersonAddIcon /> },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Espacio para el logo o nombre de la app */}
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', color: '#00796b' }}>
          Mi Aplicación
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {navItems.map((item, index) => (
            <Button
              key={index}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                color: location.pathname === item.path ? '#00796b' : '#3a3a3a',
                fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                backgroundColor: location.pathname === item.path ? '#e0f7fa' : 'transparent',
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'background-color 0.3s, color 0.3s',
                '&:hover': {
                  backgroundColor: '#f0f4f8',
                  color: '#00796b',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
