import React, { useEffect, useState } from "react";
import { getSales, getCustomers, getProducts } from "../services/api";
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import CrearVenta from "./CrearVenta";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // Carga inicial de datos
  useEffect(() => {
    fetchVentas();
    fetchClientes();
    fetchProductos();
  }, []);

  const fetchVentas = async () => {
    try {
      const response = await getSales();
      setVentas(response.data);
    } catch (error) {
      console.error("Error al obtener ventas:", error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await getCustomers();
      setClientes(response.data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await getProducts();
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const handleNuevoVenta = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleVentaCreada = () => {
    fetchVentas(); // refresca la tabla de ventas
  };

  return (
    <div>
      <h1>Ventas</h1>

      <div className="mt-6">
        <Button
          variant="contained"
          color="success"
          onClick={handleNuevoVenta}
        >
          Nueva Venta
        </Button>
      </div>

      <Table style={{ marginTop: "20px" }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Consecutivo</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ventas.map((v) => {
            const cliente = clientes.find((c) => c.id === v.customerId);
            return (
              <TableRow key={v.id}>
                <TableCell>{v.id}</TableCell>
                <TableCell>{v.consecutiveNumber}</TableCell>
                <TableCell>{cliente ? cliente.name : v.customerId}</TableCell>
                <TableCell>{v.date}</TableCell>
                <TableCell>${v.totalAmount.toFixed(2)}</TableCell>
                <TableCell>{v.status}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <CrearVenta
        open={openModal}
        onClose={handleCloseModal}
        clientes={clientes}
        productos={productos}
        onVentaCreada={handleVentaCreada}
      />
    </div>
  );
};

export default Ventas;
