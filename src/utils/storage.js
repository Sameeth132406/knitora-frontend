import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const productsRef = collection(db, "products");

export const getProducts = async () => {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

export const addProduct = async (product) => {
  await addDoc(productsRef, product);
};

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id));
};

export const updateProduct = async (id, product) => {
  await updateDoc(doc(db, "products", id), product);
};
