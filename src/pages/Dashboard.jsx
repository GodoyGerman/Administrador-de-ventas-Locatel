import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Bienvenido a Locatel Sistema Administrativo</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Link to="/clientes">
          <button>Clientes</button>
        </Link>
        <Link to="/productos">
          <button>Productos</button>
        </Link>
        <Link to="/ventas">
          <button>Ventas</button>
        </Link>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Resumen rápido</h2>
        <ul>
          <li>Clientes registrados: 120</li>
          <li>Productos disponibles: 85</li>
          <li>Ventas hoy: 15</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
