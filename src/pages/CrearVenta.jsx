import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Grid,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { createSale } from "../services/api"; // tu servicio axios

const CrearVenta = ({ open, onClose, clientes, productos, onVentaCreada }) => {
  const [venta, setVenta] = useState({
    consecutiveNumber: "",
    customerId: "",
    date: "",
    status: "PENDIENTE",
    saleDetails: [],
  });

  const handleChange = (field, value) => {
    setVenta({ ...venta, [field]: value });
  };

  const handleDetalleChange = (index, field, value) => {
    const detalles = [...venta.saleDetails];
    detalles[index][field] = value;
    setVenta({ ...venta, saleDetails: detalles });
  };

  const handleAgregarDetalle = () => {
    setVenta({
      ...venta,
      saleDetails: [...venta.saleDetails, { productId: "", quantity: 1, unitPrice: 0, iva: 0 }],
    });
  };

  const handleEliminarDetalle = (index) => {
    const detalles = venta.saleDetails.filter((_, i) => i !== index);
    setVenta({ ...venta, saleDetails: detalles });
  };

  const handleSubmit = async () => {
    try {
      await createSale(venta);
      onVentaCreada(); // refresca la lista en Ventas.jsx
      onClose();
      setVenta({
        consecutiveNumber: "",
        customerId: "",
        date: "",
        status: "PENDIENTE",
        saleDetails: [],
      });
    } catch (error) {
      console.error("Error al crear venta:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Crear Venta</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <TextField
              label="Número consecutivo"
              fullWidth
              value={venta.consecutiveNumber}
              onChange={(e) => handleChange("consecutiveNumber", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Cliente"
              fullWidth
              value={venta.customerId}
              onChange={(e) => handleChange("customerId", e.target.value)}
            >
              {clientes.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="date"
              label="Fecha"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={venta.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </Grid>
        </Grid>

        <h3 style={{ marginTop: "20px" }}>Detalles de venta</h3>
        {venta.saleDetails.map((detalle, index) => (
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={3}>
              <TextField
                select
                label="Producto"
                fullWidth
                value={detalle.productId}
                onChange={(e) => handleDetalleChange(index, "productId", e.target.value)}
              >
                {productos.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={2}>
              <TextField
                type="number"
                label="Cantidad"
                fullWidth
                value={detalle.quantity}
                onChange={(e) => handleDetalleChange(index, "quantity", parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                type="number"
                label="Precio unitario"
                fullWidth
                value={detalle.unitPrice}
                onChange={(e) => handleDetalleChange(index, "unitPrice", parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                type="number"
                label="IVA"
                fullWidth
                value={detalle.iva}
                onChange={(e) => handleDetalleChange(index, "iva", parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton color="error" onClick={() => handleEliminarDetalle(index)}>
                <RemoveCircle />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddCircle />}
          onClick={handleAgregarDetalle}
          sx={{ marginTop: 2 }}
        >
          Agregar producto
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Crear Venta
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrearVenta;
