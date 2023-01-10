import {
  GET_PRODUCTLIST_FAIL,
  GET_PRODUCTLIST_SUCCESS,
  GET_PRODUCTLIST_REQ,
  GET_SINGLEPRODUCT_REQ,
  GET_SINGLEPRODUCT_SUCCESS,
  GET_SINGLEPRODUCT_FAIL,
  GET_CART_ITEMS,
  USER_INFO_REQ,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQ,
  USER_REGISTER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQ,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from "../constant";
import axios from "axios";
import { api } from "../../common/api";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';

export const getProductList = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTLIST_REQ });
    const response = await axios.get(`${api}/Products`);
    if (response.status == 200)
      dispatch({ type: GET_PRODUCTLIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTLIST_FAIL });
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLEPRODUCT_REQ });
    const response = await axios.get(`${api}/product/${id}`);
    if (response.status == 200)
      dispatch({ type: GET_SINGLEPRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_SINGLEPRODUCT_FAIL });
  }
};

export const getCartProduct=(id,qty)=>async (dispatch,getState)=>{
    try {
          const {data}=await axios.get(`${api}/product/${id}`)
          dispatch({type:GET_CART_ITEMS,payload:{
                  product:data.productDetail._id,
                  name:data.productDetail.name,
                  image:data.productDetail.image,
                  price:data.productDetail.price,
                  countInStock:data.productDetail.countInStock,
                  qty:qty
          }})
          localStorage.setItem('cartItems',JSON.stringify(getState().cartItem))
    } catch (error) {
      console.log(error)
      
    }
}

export const deleteSpecificItem=(id)=>async(dispatch)=>{

  dispatch({type:'DELETE_CART_ITEM',payload:id});
}


export const loginUser=(email,password)=>async (dispatch)=>{

  try {
      dispatch({type:USER_INFO_REQ});
      const config={
         'content-type':'application/json'
      }
      const {data}=await axios.post(`${api}/api/users/login`,{email,password})
      dispatch({type:USER_INFO_SUCCESS,payload:data})
  } catch (error) {
      toast.error(`${error.response.data.message} `,{
        position:toast.POSITION.TOP_RIGHT
      })
      dispatch({type:USER_INFO_FAIL})
  }
}


export const signOut=()=>async (dispatch)=>{
  dispatch({type:USER_LOGOUT});
}


export const RegisterUser=(name,email,password)=>async (dispatch)=>{

  try {
      dispatch({type:USER_REGISTER_REQ});
      const config={
         'content-type':'application/json'
      }
      const {data}=await axios.post(`${api}/api/register/`,{name,email,password})
      dispatch({type:USER_REGISTER_SUCCESS,payload:data});
      dispatch({type:USER_INFO_SUCCESS,payload:data})

      if(data)
      toast.success(`${`succes`} `,{
        position:toast.POSITION.TOP_RIGHT
      })
  } catch (error) {
      toast.error(`${error.response.data.message} `,{
        position:toast.POSITION.TOP_RIGHT
      })
      dispatch({type:USER_REGISTER_FAIL})
  }
}


export const updateUser=(name,email,id)=>async (dispatch,getState)=>{

  try {
      dispatch({type:UPDATE_USER_REQ});
      const config={
         'content-type':'application/json'
      }
      const {data}=await axios.put(`${api}/api/update/profile/${id}`,{name,email})
      dispatch({type:UPDATE_USER_SUCCESS,payload:data})

      if(data)
      toast.success(`User Updates ${`successfully`} `,{
        position:toast.POSITION.TOP_RIGHT
      })
    return  new Promise((resolve,reject)=>{
      resolve(data)
     }) 
      
  } catch (error) {
      toast.error(`${error.response.data.message} `,{
        position:toast.POSITION.TOP_RIGHT
      })
      dispatch({type:UPDATE_USER_FAIL})
  }
}


export const saveShippingAddress =(data)=>(dispatch)=>{

  dispatch({
      type:CART_SAVE_SHIPPING_ADDRESS,
      payload:data
  })
}

export const savePaymentMethod =(data)=>(dispatch)=>{

  dispatch({
      type:CART_SAVE_PAYMENT_METHOD,
      payload:data
  })

}