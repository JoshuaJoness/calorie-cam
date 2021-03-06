import React, {createContext, useReducer} from 'react';


const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'SET_GOAL': {
        return { ...state, goal: action.data }
      } 
      case 'REMOVE_GOAL': {
        // return { ...state, goal: null }
        return {}
      }
      case 'ADD_FOOD_TO_LOG': {
        const foods = initialState.foods || [];
        foods.push(action.data)
        return { ...state, foods }
      }
      case 'CALORIE_NEEDS_UPDATED': {
        return { ...state, totalDailyCalorieNeeds: action.data }
      }
      case 'CLEAR_MICROS': {
        return { ...state, clearMicros: true }
      }
      case 'ADD_MICROS': {
        return { ...state, clearMicros: false }
      }
      case 'SET_HEIGHT': {
        const { feet, inches } = action.data;
        return { ...state, feet, inches }
      }
      case 'SET_AGE': {
        return { ...state, age: action.data }
      }
      case 'SET_GENDER': {
        return { ...state, gender: action.data }
      }
      case 'SET_WEIGHT': {
        return { ...state, weight: action.data }
      }
      case 'SET_ACTIVITY_LEVEL': {
        return { ...state, activityLevel: action.data }
      }
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