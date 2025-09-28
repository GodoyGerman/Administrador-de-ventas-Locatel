import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import CrearProducto from "./CrearProducto"; // Asegúrate de la ruta correcta

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Se ejecuta cuando se crea un producto desde el modal
  const handleProductoCreado = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
    handleCloseModal();
  };

  return (
    <div>
      <h1>Productos</h1>

      <div className="mt-6 mb-4">
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Nuevo Producto
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Código</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Valor Venta</TableCell>
            <TableCell>IVA (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.code}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.valorVenta}</TableCell>
              <TableCell>{p.porcentajeIva}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CrearProducto
        open={openModal}
        onClose={handleCloseModal}
        onProductoCreado={handleProductoCreado}
      />
    </div>
  );
};

export default Productos;
