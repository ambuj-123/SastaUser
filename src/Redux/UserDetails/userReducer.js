import {SET_USER_DATA} from './userActionsType';

const initialState = {
     userData: null,
};

export default UserReducer = (state = initialState, action) => {
     
     switch (action.type) {
          case SET_USER_DATA:
               return {
               ...state,
               userData: action.payload,
          };
          default:
               return state;
          }
};
