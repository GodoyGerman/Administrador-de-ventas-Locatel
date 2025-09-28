import React, { useEffect, useState } from "react";
import { getCustomers } from "../services/api";
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import CrearCliente from "./CrearCliente";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setClientes(response.data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  const handleNuevoCliente = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClienteCreado = () => {
    fetchCustomers(); // refresca la lista de clientes
  };

  return (
    <div>
      <h1>Clientes</h1>

      

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Teléfono</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.id}</TableCell>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.mail}</TableCell>
              <TableCell>{c.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CrearCliente
        open={openModal}
        onClose={handleCloseModal}
        onClienteCreado={handleClienteCreado}
      />
    </div>
  );
};

export default Clientes;
