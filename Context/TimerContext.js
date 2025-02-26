import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const TimerContext = createContext();

const initialState = {
  timers: [],
  completedTimers: [], // Stores completed timers history
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_TIMERS':
      return { ...state, timers: action.payload };

    case 'LOAD_HISTORY':
      return { ...state, completedTimers: action.payload };

    case 'ADD_TIMER':
      const updatedTimers = [...state.timers, { ...action.payload, status: 'Paused', running: false }];
      AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
      return { ...state, timers: updatedTimers };

    case 'START_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload ? { ...timer, running: true, status: 'Running' } : timer
        ),
      };

    case 'PAUSE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload ? { ...timer, running: false, status: 'Paused' } : timer
        ),
      };

    case 'RESET_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload
            ? { ...timer, remaining: timer.duration, running: false, status: 'Paused' }
            : timer
        ),
      };

    case 'DELETE_TIMER':
      const filteredTimers = state.timers.filter(timer => timer.id !== action.payload);
      AsyncStorage.setItem('timers', JSON.stringify(filteredTimers));
      return { ...state, timers: filteredTimers };

    case 'START_ALL':
      return {
        ...state,
        timers: state.timers.map(timer =>
          action.payload.includes(timer.id) ? { ...timer, running: true, status: 'Running' } : timer
        ),
      };

    case 'PAUSE_ALL':
      return {
        ...state,
        timers: state.timers.map(timer =>
          action.payload.includes(timer.id) ? { ...timer, running: false, status: 'Paused' } : timer
        ),
      };

    case 'RESET_ALL':
      return {
        ...state,
        timers: state.timers.map(timer =>
          action.payload.includes(timer.id)
            ? { ...timer, remaining: timer.duration, running: false, status: 'Paused' }
            : timer
        ),
      };

      case 'TICK':
        let completedTimer = null;
      
        const updatedTickTimers = state.timers.map(timer => {
          if (timer.running && timer.remaining > 0) {
            return { ...timer, remaining: timer.remaining - 1 };
          } else if (timer.running && timer.remaining === 0) {
            completedTimer = { id: timer.id, name: timer.name }; // ✅ Set completed timer
            return { ...timer, running: false, status: 'Completed' };
          }
          return timer;
        });
      
        return {
          ...state,
          timers: updatedTickTimers,
          completedTimer: completedTimer || state.completedTimer, 
        };
      
      case 'CLEAR_COMPLETED_TIMER':
        return {
          ...state,
          completedTimer: null, 
        };
      

    default:
      return state;
  }
};

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    const loadTimers = async () => {
      const storedTimers = await AsyncStorage.getItem('timers');
      if (storedTimers) {
        dispatch({ type: 'LOAD_TIMERS', payload: JSON.parse(storedTimers) });
      }

      const storedHistory = await AsyncStorage.getItem('completedTimers');
      if (storedHistory) {
        dispatch({ type: 'LOAD_HISTORY', payload: JSON.parse(storedHistory) });
      }
    };
    loadTimers();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
