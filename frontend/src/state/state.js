import { createContext, useContext, useReducer } from "react";

const initialState = {
    income: [],
    expenses: [],
    savings: [],
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_INCOME":
        return { ...state, income: action.payload };
      case "SET_EXPENSES":
        return { ...state, expenses: action.payload };
      case "SET_SAVINGS":
        return { ...state, savings: action.payload };
      default:
        return state;
    }
  };
  
  const StateContext = createContext();
  
  export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <StateContext.Provider value={{ state, dispatch }}>
        {children}
      </StateContext.Provider>
    );
  };
  
  export const useStateContext = () => useContext(StateContext);