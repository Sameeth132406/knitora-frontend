import { getProducts } from "../utils/storage";
import ProductCard from "../components/ProductCard";

function Shop() {
  const products = getProducts();

  return (
    <div className="shop">
      {products.length === 0 && <p>No products available</p>}

      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}

export default Shop;
