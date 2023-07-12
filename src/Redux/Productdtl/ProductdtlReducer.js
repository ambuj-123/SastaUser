import {  SET_PRODUCTDTL_DATA } from './ProductdtlActionsTypes';
const initialState = {
    data: null
};

export default ProductdtlReducer = (state = initialState, action) => {
    
     switch (action.type) {
          case SET_PRODUCTDTL_DATA:
               return {
                    ...state,
                    data: action.payload,
               };
          default:
          return state;
     }
};
