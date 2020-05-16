export const getCartState = store => store.products;

export const getProductsList = store =>
  getCartState(store) ? getCartState(store).allIds : [];

export const getProductById = (store, id) =>
  getCartState(store) ? { ...getCartState(store).byIds[id], id } : {};

export const getCartItems = store =>
  getProductsList(store).map(id => getProductById(store, id));
