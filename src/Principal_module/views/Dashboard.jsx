import React from 'react';
import NavigationBar from '../components/navegation_bar';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <NavigationBar /> 
            </nav>
            <main className="main-content">
                <h1>Bienvenido al Dashboard</h1>
                <p>gaaa</p>
            </main>
        </div>
    );
};

export default Dashboard;
