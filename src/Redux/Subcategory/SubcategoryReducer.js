import {  SET_SUBCATEGORY_DATA } from './SubcategoryActionsTypes';
const initialState = {
    data: null
};

export default SubcategoryReducer = (state = initialState, action) => {
    
     switch (action.type) {
          case SET_SUBCATEGORY_DATA:
               return {
                    ...state,
                    data: action.payload,
               };
          default:
          return state;
     }
};
