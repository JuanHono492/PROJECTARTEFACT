import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import NavigationBar from '../components/navegation_bar';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Datos de ejemplo para los gráficos
  const barChartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Usuarios Nuevos',
        data: [50, 75, 100, 125, 150, 175],
        backgroundColor: '#36a2eb'
      },
      {
        label: 'Usuarios Activos',
        data: [80, 100, 130, 150, 180, 200],
        backgroundColor: '#4bc0c0'
      }
    ]
  };

  const lineChartData = {
    labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7'],
    datasets: [
      {
        label: 'Ingresos Semanales',
        data: [400, 500, 600, 700, 800, 900, 1000],
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <NavigationBar /> {/* Componente de barra de navegación */}
      </nav>
      <main className="main-content">
        <h1 className="dashboard-title">Panel de Control</h1>
        <div className="dashboard-cards">
          <div className="card">
            <h2>Usuarios</h2>
            <Bar data={barChartData} />
          </div>
          <div className="card">
            <h2>Ingresos Semanales</h2>
            <Line data={lineChartData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
