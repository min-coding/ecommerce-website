import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default function HomeScreen() {
  const [{ loading, error, products }, dispatch] = React.useReducer(
    logger(reducer),
    {
      products: [],
      loading: true,
      error: '',
    }
  );

  React.useEffect(() => {
    async function fetchData() {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h2> Featured product</h2>
      {loading ? (
        <h1> Loading..........</h1>
      ) : error ? (
        <div> {error}</div>
      ) : (
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
      )}
    </>
  );
}
