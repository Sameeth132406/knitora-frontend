import { useState, useEffect } from "react";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../utils/storage";
import { collection, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { db, storage, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [authReady, setAuthReady] = useState(false); // ✅ FIX

  // 🔐 AUTH + 🔁 REALTIME PRODUCTS
  useEffect(() => {
    const authUnsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/admin");
      } else {
        setAuthReady(true); // ✅ allow render
      }
    });

    const productsUnsub = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
      }
    );

    return () => {
      authUnsub();
      productsUnsub();
    };
  }, []);

  // 🖼️ Image handler
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
  };

  // ➕ / ✏️ Save product
  const submitProduct = async () => {
    if (!name || !price || !description) {
      alert("Name, price and description are required");
      return;
    }

    let imageUrl = image;

    if (imageFile) {
      const imageRef = ref(
        storage,
        `products/${Date.now()}-${imageFile.name}`
      );
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const productData = {
      name,
      price,
      description,
      image: imageUrl,
      contact: "919345864907",
    };

    if (editId) {
      await updateProduct(editId, productData);
    } else {
      await addProduct(productData);
    }

    resetForm();
  };

  // ✏️ Edit
  const editProduct = (p) => {
    setName(p.name);
    setPrice(p.price);
    setDescription(p.description);
    setImage(p.image || "");
    setImageFile(null);
    setEditId(p.id);
  };

  // 🗑️ Delete
  const removeProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setImage("");
    setImageFile(null);
    setEditId(null);
  };

  // ⛔ Wait for auth before rendering
  if (!authReady) return null;

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

        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleImage} />

        <button onClick={submitProduct}>
          {editId ? "Update Product" : "Add Product"}
        </button>

        {editId && (
          <button
            onClick={resetForm}
            style={{ marginLeft: "10px" }}
          >
            Cancel Edit
          </button>
        )}
      </div>

      <h3>Product List</h3>

      <div className="admin-list">
        {products.map((p) => (
          <div key={p.id} className="admin-card">
            {p.image && <img src={p.image} alt={p.name} />}
            <p><strong>{p.name}</strong></p>
            <p>₹{p.price}</p>
            <p>{p.description}</p>

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
