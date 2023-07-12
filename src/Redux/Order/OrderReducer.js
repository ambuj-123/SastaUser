import {  SET_ORDER_DATA } from './OrderActionsTypes';
const initialState = {
    data: null
};

export default OrderReducer = (state = initialState, action) => {
    
     switch (action.type) {
          case SET_ORDER_DATA:
               return {
                    ...state,
                    data: action.payload,
               };
          default:
          return state;
     }
};
