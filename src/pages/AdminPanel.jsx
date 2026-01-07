import { useState, useEffect } from "react";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../utils/storage";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState(null);

  // 🔹 Load products from Firebase
  useEffect(() => {
    if (localStorage.getItem("admin") !== "true") {
      navigate("/admin");
      return;
    }
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  // 🔹 Handle image safely
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  // 🔹 Add / Update product
  const submitProduct = async () => {
    if (!name || !price) {
      alert("Name and price required");
      return;
    }

    const productData = {
      name,
      price,
      image,
      contact: "919345864907",
    };

    if (editId) {
      await updateProduct(editId, productData);
    } else {
      await addProduct(productData);
    }

    resetForm();
    loadProducts();
  };

  // 🔹 Edit product
  const editProduct = (product) => {
    setName(product.name);
    setPrice(product.price);
    setImage(product.image || "");
    setEditId(product.id);
  };

  // 🔹 Delete product
  const removeProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setImage("");
    setEditId(null);
  };

  return (
    <div className="admin">
      <h2>Admin Panel</h2>

      <div className="admin-form">
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleImage} />

        <button onClick={submitProduct}>
          {editId ? "Update Product" : "Add Product"}
        </button>

        {editId && (
          <button onClick={resetForm} className="secondary">
            Cancel Edit
          </button>
        )}
      </div>

      <h3>Product List</h3>

      <div className="admin-list">
        {products.map((p) => (
          <div key={p.id} className="admin-card">
            {p.image && <img src={p.image} alt={p.name} />}
            <p>
              <strong>{p.name}</strong>
            </p>
            <p>₹{p.price}</p>

            <button onClick={() => editProduct(p)}>Edit</button>
            <button
              onClick={() => removeProduct(p.id)}
              className="danger"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
