import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_INFO,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_METHOD,
} from "../constants/cartConstants";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingInfoFromStorage = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {};

export const cartReducer = (
  state = {
    cartItems: cartItemsFromStorage,
    shippingInfo: shippingInfoFromStorage,
  },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      //item.product = action.payload.product = fetched data._id

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_SAVE_SHIPPING_METHOD:
      return {
        ...state,
        shippingMethod: action.payload,
      };

    default:
      return state;
  }
};
