import {  SET_HOME_DATA } from './HomeActionsTypes';
const initialState = {
    data: null
};

export default HomeReducer = (state = initialState, action) => {
    
     switch (action.type) {
          case SET_HOME_DATA:
               return {
                    ...state,
                    data: action.payload,
               };
          default:
          return state;
     }
};
