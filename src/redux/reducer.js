import {
    CHANGE_CATEGORY,
    CHANGE_DIFFICULTY,
    CHANGE_SCORE,
    CHANGE_TYPE,
    SET_NAME,
  } from "./actionsTypes";
  
const initialState = {
    question_category: "",
    question_difficulty: "",
    question_type: "",
    score: 0,
    name:"",
};
  
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_NAME:
        return {
            ...state,
            name: action.payload,
        };
      case CHANGE_CATEGORY:
        return {
          ...state,
          question_category: action.payload,
        };
      case CHANGE_DIFFICULTY:
        return {
          ...state,
          question_difficulty: action.payload,
        };
      case CHANGE_TYPE:
        return {
          ...state,
          question_type: action.payload,
        };
      case CHANGE_SCORE:
        return {
          ...state,
          score: action.payload,
        };
      default:
        return state;
    }
  };
  
export default reducer;