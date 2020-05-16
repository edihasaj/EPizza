import { ADD_TO_CART, INCREMENT_ITEM_CART, DECREMENT_ITEM_CART, USER_AUTHENTICATED, EMPTY_CART } from "./actionTypes";

export const addToCart = product => ({
  type: ADD_TO_CART,
  payload: {
    id: product.id,
    product: {
      id: product.id,
      name: product.name,
      fillers: product.fillers,
      price: product.price,
      quantity: product.quantity ? product.quantity : 1
    }
  }
});

export const incrementProduct = id => ({
  type: INCREMENT_ITEM_CART,
  payload: { 
    id: id
   }
});

export const decrementProduct = id => ({
  type: DECREMENT_ITEM_CART,
  payload: { 
    id: id
   }
});

export const emptyCart = () => ({
  type: EMPTY_CART
});

export const userAuthenticated = authed => ({
  type: USER_AUTHENTICATED,
  payload: {
    authed: authed
  }
})