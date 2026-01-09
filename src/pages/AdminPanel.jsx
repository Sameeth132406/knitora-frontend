import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const API_URL = "/api/products";

function AdminPanel() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);


useEffect(() => {
  const unsub = onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/admin");
    } else {
      loadProducts();
    }
  });

  return () => unsub();
}, []);


  const loadProducts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProducts(data);
  };

  const handleImage = (e) => {
    setImageFile(e.target.files[0]);
  };

  // ➕ ADD / ✏️ UPDATE
  const submitProduct = async () => {
    if (!name || !price || !description) {
      alert("All fields required");
      return;
    }

    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("description", description);
    if (imageFile) form.append("image", imageFile);

    if (editId) {
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        body: form,
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        body: form,
      });
    }

    resetForm();
    loadProducts();
    navigate("/shop");
  };

  const editProduct = (p) => {
    setName(p.name);
    setPrice(p.price);
    setDescription(p.description);
    setEditId(p.id);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadProducts();
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setImageFile(null);
    setEditId(null);
  };

  return (
    <div className="admin">
      <h2>Admin Panel</h2>

      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input type="file" onChange={handleImage} />

      <button onClick={submitProduct}>
        {editId ? "Update Product" : "Add Product"}
      </button>

      {editId && (
        <button onClick={resetForm} style={{ marginLeft: 10 }}>
          Cancel Edit
        </button>
      )}

      <h3>Product List</h3>

      <div className="admin-list">
        {products.map((p) => (
          <div key={p.id} className="admin-card">
            {p.image && (
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.name}
              />
            )}
            <p><strong>{p.name}</strong></p>
            <p>₹{p.price}</p>
            <p>{p.description}</p>

            <button onClick={() => editProduct(p)}>Edit</button>
            <button
              onClick={() => deleteProduct(p.id)}
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
