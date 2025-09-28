import axios from "axios";

// Configuración base
const customersApi = axios.create({
  baseURL: "http://localhost:8081/customers",
});

const productsApi = axios.create({
  baseURL: "http://localhost:8083/product",
});

const salesApi = axios.create({
  baseURL: "http://localhost:8082/sales",
});

// Funciones para Customers
export const getCustomers = () => customersApi.get("");            // sin /
export const getCustomerById = (id) => customersApi.get(`/${id}`);
export const createCustomer = (data) => customersApi.post("", data);
export const updateCustomer = (id, data) => customersApi.put(`/${id}`, data);
export const deleteCustomer = (id) => customersApi.delete(`/${id}`);

// Funciones para Products
export const getProducts = () => productsApi.get("");              // sin /
export const getProductById = (id) => productsApi.get(`/${id}`);
export const createProduct = (data) => productsApi.post("", data);
export const updateProduct = (id, data) => productsApi.put(`/${id}`, data);
export const deleteProduct = (id) => productsApi.delete(`/${id}`);


// Funciones para Sales

export const getSales = () => salesApi.get("");
export const createSale = (data) => salesApi.post("", data);