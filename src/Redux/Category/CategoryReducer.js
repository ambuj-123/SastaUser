import {  SET_CATEGORY_DATA } from './CategoryActionsTypes';
const initialState = {
    data: null
};

export default CategoryReducer = (state = initialState, action) => {
    
     switch (action.type) {
          case SET_CATEGORY_DATA:
               return {
                    ...state,
                    data: action.payload,
               };
          default:
          return state;
     }
};
