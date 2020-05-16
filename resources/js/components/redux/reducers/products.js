import { ADD_TO_CART, INCREMENT_ITEM_CART, DECREMENT_ITEM_CART, EMPTY_CART } from "../actionTypes";
import update from 'react-addons-update';

const initialState = {
  cartItems: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, product } = action.payload;
      Object.keys(state.cartItems).forEach((key) => {
        let pizza = state.cartItems[key].product;
        if (pizza.id === product.id) {
          return update(state, { 
            cartItems: {
              [product.id]: {
                product: {
                  quantity: {$set: product.quantity++}
                }
              }
            }
          })
        }
      });
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [id]: {
            product
          }
        }
      };
    }
    case INCREMENT_ITEM_CART: {
      const { id } = action.payload;
      const pizzaToUpdate = state.cartItems[id].product;
      pizzaToUpdate.quantity++;
      return update(state, { 
        cartItems: {
          [id]: {
            product: {$set: pizzaToUpdate}
          }
        }
      })
    }
    case DECREMENT_ITEM_CART: {
      const { id } = action.payload;
      const pizzaToUpdate = state.cartItems[id].product;
      if (pizzaToUpdate.quantity === 1) {
        const newStateCartItems = { ...state.cartItems };
        delete newStateCartItems[id];
        return {
          ...state,
          cartItems: newStateCartItems
        }
      }
      pizzaToUpdate.quantity--;
      return update(state, { 
        cartItems: {
          [id]: {
            product: {$set: pizzaToUpdate}
          }
        }
      });
    }
    case EMPTY_CART: {
      return {
        ...state,
        cartItems: {}
      };
    }
    default:
      return state;
  }
}
