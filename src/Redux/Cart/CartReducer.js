import {  SET_CART_DATA } from './CartActionsTypes';
const initialState = {
    data: null
};

export default CartReducer = (state = initialState, action) => {
    
     switch (action.type) {
          case SET_CART_DATA:
               return {
                    ...state,
                    data: action.payload,
               };
          default:
          return state;
     }
};
