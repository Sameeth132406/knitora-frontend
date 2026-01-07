// src/utils/storage.js
export function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

export function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

export function addProduct(product) {
  const products = getProducts();
  products.push(product);
  saveProducts(products);
}

export function deleteProduct(index) {
  const products = getProducts();
  products.splice(index, 1);
  saveProducts(products);
}

export function updateProduct(index, updatedProduct) {
  const products = getProducts();
  products[index] = updatedProduct;
  saveProducts(products);
}
