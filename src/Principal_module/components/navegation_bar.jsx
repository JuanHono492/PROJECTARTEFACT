import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const location = useLocation();

  // Mapeo de rutas a índices de pestañas
  const tabRoutes = [
    '/dashboard',
    '/gestion-citas',
    '/historial-clinico',
    '/consulta-externa',
    '/generacion-reportes',
  ];

  // Encuentra el índice correspondiente a la ruta actual, si no coincide, usa 0
  const currentTab = tabRoutes.indexOf(location.pathname);
  const [value, setValue] = React.useState(currentTab !== -1 ? currentTab : 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    // Sincroniza el valor cuando la ruta cambia
    if (currentTab !== -1 && currentTab !== value) {
      setValue(currentTab);
    }
  }, [location.pathname, currentTab, value]);

  return (
    <Box sx={{ width: '100%', backgroundColor: '#ffffff' }}> {/* Fondo blanco */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{ style: { backgroundColor: '#20869c' } }} // Cambiar el color del indicador
          textColor="inherit" // Permite que el color de las tabs se herede
          sx={{
            '& .MuiTab-root': { color: '#20869c' }, // Establece el color de texto celeste
          }}
        >
          <Tab component={Link} to="/dashboard" label="Dashboard" {...a11yProps(0)} />
          <Tab component={Link} to="/gestion-citas" label="Gestión de Citas" {...a11yProps(1)} />
          <Tab component={Link} to="/historial-clinico" label="Historial Clínico" {...a11yProps(2)} />
          <Tab component={Link} to="/consulta-externa" label="Consulta Externa" {...a11yProps(3)} />
          <Tab component={Link} to="/generacion-reportes" label="Generación de Reportes" {...a11yProps(4)} />
        </Tabs>
      </Box>
    </Box>
  );
}
