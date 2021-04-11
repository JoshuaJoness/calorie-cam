import React, {createContext, useReducer} from 'react';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'SET_AGE': {
        return { ...initialState, age: action.data }
        break;
      }
      case 'FORCE_RERENDER':
        return { ...initialState, rerender: true }
        break;
      default:
        break;
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }

// useReducer takes 2 arguements
// it accepts an object, which will be used as our global state
// it also accepts a function, which will update this global state object