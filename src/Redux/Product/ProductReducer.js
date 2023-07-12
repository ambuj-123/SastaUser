import {  SET_PRODUCT_DATA } from './ProductActionsTypes';
const initialState = {
    data: null
};

export default ProductReducer = (state = initialState, action) => {
    
     switch (action.type) {
          case SET_PRODUCT_DATA:
               return {
                    ...state,
                    data: action.payload,
               };
          default:
          return state;
     }
};
