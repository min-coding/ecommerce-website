import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function HomeScreen() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <h2> Featured product</h2>
      <div className="featured-product-list">
        {products.map((product) => {
          return (
            <div key={product.slug} className="product-container">
              <Link to={`/products/${product.slug}`}>
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                />
              </Link>

              <h3>
                <Link to={`/products/${product.slug}`}>
                  <strong>{product.name}</strong>
                </Link>
              </h3>
              <h4>${product.price}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
}
