import React from 'react';

const Store = React.createContext();
const initialState = {
  cart: {
    cartItems: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const newItem = action.payload
      const existItem = state.cart.cartItems.find((item) => item._id === newItem._id);
      const cartItems = existItem ? state.cart.cartItems.map(item => 
        // Update item (if already in the cart)
        item._id === existItem._id ? newItem : item 
      ) :
        // Add new item (if not in the cart)
        [...state.cart.cartItems, newItem]
      
      return {...state,cart:{...state.cart,cartItems}}

    default:
      return state;
  }
}

function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // useReducer returns state and dispatch 
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export {Store, StoreProvider}
