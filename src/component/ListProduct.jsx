import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Spinner } from 'react-bootstrap';
import apiClient from '../utils/apiClient';
import { useAuth } from '../Context/AuthContext';

export default function ListProduct() {
  const { logout } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);  // NEW: submission state

  // Fetch products list
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/products/list-all-products');
      setProducts(response.data || []);
    } catch (error) {
      alert('Error fetching products: ' + (error.response?.data?.message || error.message));
      if (error.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.description) errors.description = 'Description is required';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      errors.price = 'Price must be a positive number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '' });
    setFormErrors({});
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await apiClient.delete(`/api/products/delete-product/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      alert('Failed to delete product: ' + (error.response?.data?.message || error.message));
      if (error.response?.status === 401) logout();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);  // start submitting state
    try {
      if (editingProduct) {
        const response = await apiClient.put(
          `/api/products/update-product/${editingProduct.id}`,
          {
            name: formData.name.trim(),
            description: formData.description.trim(),
            price: parseFloat(formData.price),
          }
        );
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? response.data : p))
        );
      } else {
        const response = await apiClient.post(
          '/api/products/create-product',
          {
            name: formData.name.trim(),
            description: formData.description.trim(),
            price: parseFloat(formData.price),
          }
        );
        setProducts((prev) => [...prev, response.data]);
      }
      setShowModal(false);
    } catch (error) {
      alert('Failed to save product: ' + (error.response?.data?.message || error.message));
      if (error.response?.status === 401) logout();
    } finally {
      setSubmitting(false);  // stop submitting state
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Products</h2>
        <Button variant="primary" onClick={handleAdd}>
          Add New Product
        </Button>
      </div>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th className="text-end">Price</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ id, name, description, price, createdAt }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{description}</td>
                <td className="text-end">${price.toFixed(2)}</td>
                <td>{new Date(createdAt).toLocaleString()}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit({ id, name, description, price })}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} noValidate>
          <Modal.Body>
            <Form.Group controlId="productName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!formErrors.name}
                placeholder="Enter product name"
                required
              />
              <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="productDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                isInvalid={!!formErrors.description}
                placeholder="Enter product description"
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="productPrice" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                isInvalid={!!formErrors.price}
                placeholder="Enter product price"
                required
                min="0"
              />
              <Form.Control.Feedback type="invalid">{formErrors.price}</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting && <Spinner animation="border" size="sm" className="me-2" />}
              {editingProduct ? 'Update' : 'Create'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
