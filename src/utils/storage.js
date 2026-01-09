import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const productsRef = collection(db, "products");

export const addProduct = async (product) => {
  await addDoc(productsRef, {
    ...product,
    createdAt: serverTimestamp(),
  });
};

export const updateProduct = async (id, product) => {
  await updateDoc(doc(db, "products", id), {
    ...product,
    updatedAt: serverTimestamp(),
  });
};

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id));
};
