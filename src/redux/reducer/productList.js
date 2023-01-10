import {
  GET_PRODUCTLIST_REQ,
  GET_PRODUCTLIST_SUCCESS,
  GET_PRODUCTLIST_FAIL,
  GET_SINGLEPRODUCT_REQ,
  GET_SINGLEPRODUCT_SUCCESS,
  GET_SINGLEPRODUCT_FAIL,
  GET_CART_ITEMS,
  DELETE_CART_ITEM,
  USER_INFO_REQ,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQ,
  USER_REGISTER_SUCCESS,
  UPDATE_USER_SUCCESS,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from "../constant";

const initialState = {
  loadingproductsData: false,
  products: {},
  sortProduct: {},
  cartItem: [],
  userInfo: {},
  userLoading: false,
  userRegister: {},
  shippingAddress:{},
  paymentMethod:{}
};

export const getProductListFromReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTLIST_REQ:
      return {
        ...state,
        loadingproductsData: true,
      };
    case GET_PRODUCTLIST_SUCCESS:
      return {
        ...state,
        loadingproductsData: false,
        productsData: action.payload,
      };
    case GET_PRODUCTLIST_FAIL:
      return {
        ...state,
        loadingproductsData: false,
      };

    case GET_SINGLEPRODUCT_REQ:
      return {
        ...state,
        loadingproductsData: true,
      };
    case GET_SINGLEPRODUCT_SUCCESS:
      return {
        ...state,
        loadingproductsData: false,
        sortProduct: action.payload.productDetail,
      };
    case GET_SINGLEPRODUCT_FAIL:
      return {
        ...state,
        loadingproductsData: false,
      };
    case GET_CART_ITEMS:
      const item = action.payload;
      const exitItem = state.cartItem.find((x) => x.product === item.product);
      if (exitItem) {
        return {
          ...state,
          cartItem: state.cartItem.map((x) =>
            x.product === exitItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItem: [...state.cartItem, item],
        };
      }

    case DELETE_CART_ITEM:
      const id = action.payload;
      const copyCartItem = state.cartItem.filter((item) => item.product != id);
      console.log(copyCartItem, "check cartItem");
      return {
        ...state,
        cartItem: copyCartItem,
      };

    case USER_INFO_REQ:
      return {
        userLoading: true,
        ...state,
      };
    case USER_INFO_SUCCESS:
      return {
        ...state,
        userLoading: false,
        userInfo: action.payload,
      };

    case USER_INFO_FAIL:
      return {
        ...state,
        userLoading: false,
      };
    case USER_LOGOUT:
      return {
        ...state,
        userInfo: {},
      };
    case USER_REGISTER_REQ:
      return {
        userLoading: true,
        ...state,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        userRegister: action.payload,
      };

    case USER_REGISTER_FAIL:
      return {
        ...state,
        userLoading: false,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        userInfo: action.payload,
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return{
        ...state,
        shippingAddress:action.payload
      }


      case CART_SAVE_PAYMENT_METHOD:
        return{
          ...state,
          paymentMethod:action.payload
        }

    default:
      return {
        ...state,
      };
  }
};
