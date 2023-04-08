import React from "react";

const CartContext = React.createContext({
  cartList: [],
  onClickAddToCartItem: () => {},
  onClickIncCount: () => {},
  onClickDecCount: () => {},
  onClickRemoveLocal: () => {},
});

export default CartContext;
