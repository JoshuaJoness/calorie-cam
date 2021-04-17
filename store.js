import React, {createContext, useReducer} from 'react';
import { AsyncStorage } from 'react-native';


const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

// THIS IS CASUING A CRASH, prob due to how the navigator is configured...
// const setTotalDailyCalorieNeeds = async (calories) => await AsyncStorage.setItem('totalDailyCalorieNeeds', calories);

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'GOAL_UPDATED': {
        // console.log(state, 'state in store (getting overridden)')
        return { ...state, goal: action.data }
      }
      case 'ADD_FOOD_TO_LOG': {
        const foods = initialState.foods || [];
        foods.push(action.data)
        return { ...state, foods }
      }
      case 'CALORIE_NEEDS_UPDATED': {
        // console.log(state,'state')
        return { ...state, totalDailyCalorieNeeds: action.data }
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