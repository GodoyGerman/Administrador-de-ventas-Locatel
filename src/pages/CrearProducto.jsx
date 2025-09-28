import React, { useState } from "react";
import { createProduct } from "../services/api"; // asegúrate de que la ruta sea correcta

const CrearProducto = () => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    valorVenta: 0,
    manejaIva: true,
    porcentajeIva: 0
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      await createProduct(formData);
      setMensaje("Producto creado exitosamente");
      // Resetear formulario si quieres
      setFormData({
        code: "",
        name: "",
        valorVenta: 0,
        manejaIva: true,
        porcentajeIva: 0
      });
    } catch (error) {
      console.error("Error al crear producto:", error);
      setMensaje("Error al crear producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Crear Producto</h1>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="Código"
          required
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre del producto"
          required
          className="border px-2 py-1 rounded"
        />
        <input
          type="number"
          name="valorVenta"
          value={formData.valorVenta}
          onChange={handleChange}
          placeholder="Valor de venta"
          required
          className="border px-2 py-1 rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="manejaIva"
            checked={formData.manejaIva}
            onChange={handleChange}
          />
          Maneja IVA
        </label>
        <input
          type="number"
          name="porcentajeIva"
          value={formData.porcentajeIva}
          onChange={handleChange}
          placeholder="Porcentaje IVA"
          required
          className="border px-2 py-1 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creando..." : "Crear Producto"}
        </button>
      </form>
    </div>
  );
};

export default CrearProducto;
