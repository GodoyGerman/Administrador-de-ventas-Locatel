// CrearCliente.jsx
import React, { useState } from "react";
import { createCustomer } from "../services/api";

const CrearCliente = () => {
  const [formData, setFormData] = useState({
    identificationNumber: "",
    name: "",
    phone: "",
    mail: "",
    address: "",
    iban: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await createCustomer({ id: 0, ...formData });
      setMessage("Cliente creado exitosamente ✅");
      // Limpiar formulario
      setFormData({
        identificationNumber: "",
        name: "",
        phone: "",
        mail: "",
        address: "",
        iban: "",
      });
    } catch (error) {
      console.error("Error al crear cliente:", error);
      setMessage("Error al crear cliente ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Crear Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="identificationNumber"
          placeholder="Número de identificación"
          value={formData.identificationNumber}
          onChange={handleChange}
        />
        <input
          name="name"
          placeholder="Nombre completo"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          name="mail"
          placeholder="Correo electrónico"
          value={formData.mail}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          name="iban"
          placeholder="IBAN"
          value={formData.iban}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear Cliente"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CrearCliente;
