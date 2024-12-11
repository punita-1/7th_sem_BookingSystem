// import { createContext, useReducer } from "react";

// // Define the initial state for the search context
// const INITIAL_STATE = {
//     city: undefined,
//     dates: [],
//     options: {
//         adult: undefined,
//         children: undefined,
//         room: undefined,
//     },
// };

// // Create a context for search
// export const SearchContext = createContext(INITIAL_STATE);

// // Define the reducer function
// const SearchReducer = (state, action) => {
//     switch (action.type) {
//         case "NEW_SEARCH":
//             // Validate the payload to ensure it's correctly formatted
//             return {
//                 ...state,
//                 city: action.payload.city || state.city,
//                 dates: action.payload.dates || state.dates,
//                 options: action.payload.options || state.options,
//             };

//         case "RESET_SEARCH":
//             return INITIAL_STATE;

//         default:
//             return state;
//     }
// };

// // Define the SearchContextProvider component
// export const SearchContextProvider = ({ children }) => {
//     const [searchState, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

//     return (
//         <SearchContext.Provider
//             value={{
//                 city: searchState.city,
//                 dates: searchState.dates,
//                 options: searchState.options,
//                 dispatch,
//             }}
//         >
//             {children}
//         </SearchContext.Provider>
//     );
// };

import { createContext, useReducer } from "react";

// Define the initial state for the search context
const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

// Create a context for search
export const SearchContext = createContext(INITIAL_STATE);

// Define the reducer function
const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return {
        ...state,
        city: action.payload.city || state.city,
        dates: action.payload.dates || state.dates,
        options: action.payload.options || state.options,
      };
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

// Define the SearchContextProvider component
export const SearchContextProvider = ({ children }) => {
  const [searchState, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        city: searchState.city,
        dates: searchState.dates,
        options: searchState.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
