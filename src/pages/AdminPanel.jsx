import { useState, useEffect } from "react";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct
} from "../utils/storage";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("admin") !== "true") {
      navigate("/admin");
    }
    setProducts(getProducts());
  }, []);

  const handleImage = (e) => {
  const file = e.target.files?.[0];
  if (!file) return; // ✅ prevents crash

  const reader = new FileReader();
  reader.onload = () => setImage(reader.result);
  reader.readAsDataURL(file);
};


  const submitProduct = () => {
    if (!name || !price) {
      alert("Name and price required");
      return;
    }

    const productData = {
      name,
      price,
      image: image || products[editIndex]?.image,
      contact: "919345864907"
    };

    if (editIndex !== null) {
      updateProduct(editIndex, productData);
      setEditIndex(null);
    } else {
      addProduct(productData);
    }

    setProducts(getProducts());
    resetForm();
  };

  const editProduct = (index) => {
    const p = products[index];
    setName(p.name);
    setPrice(p.price);
    setImage(p.image);
    setEditIndex(index);
  };

  const removeProduct = (index) => {
    if (window.confirm("Delete this product?")) {
      deleteProduct(index);
      setProducts(getProducts());
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setImage("");
    setEditIndex(null);
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
          {editIndex !== null ? "Update Product" : "Add Product"}
        </button>

        {editIndex !== null && (
          <button onClick={resetForm} className="secondary">
            Cancel Edit
          </button>
        )}
      </div>

      <h3>Product List</h3>

      <div className="admin-list">
        {products.map((p, i) => (
          <div key={i} className="admin-card">
            <img src={p.image} />
            <p><strong>{p.name}</strong></p>
            <p>₹{p.price}</p>

            <button onClick={() => editProduct(i)}>Edit</button>
            <button onClick={() => removeProduct(i)} className="danger">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
