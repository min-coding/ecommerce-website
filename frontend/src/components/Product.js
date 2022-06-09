import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Store';

export default function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = React.useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  async function addToCartHandler(item) {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  }
  return (
    <Card>
      <Link to={`/products/${product.slug}`}>
        <img className="product-image" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/products/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            {' '}
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>
            {' '}
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
