/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from 'react';
import { format } from 'date-fns';
import { loadState, saveState } from './local-storage.js';

// @ts-ignore
export const AppContext: any = createContext([]);
export function useAppState() {
  // @ts-ignore
  return useContext(AppContext)[0];
}

export function useAppReducer() {
  // @ts-ignore
  return useContext(AppContext)[1];
}

export function useItems() {
  const { items } = useAppState();

  const pending = items.filter(
    (item: { status: string }) => item.status === 'pending',
  );
  const paused = items.filter(
    (item: { status: string }) => item.status === 'paused',
  );
  const completed = items.filter(
    (item: { status: string }) => item.status === 'completed',
  );

  return { pending, paused, completed };
}

const appStateReducer = (
  state: { items: any[] },
  action: { type: any; item: { key: any; status: any } },
) => {
  const nd = new Date();

  const currentDate = {
    day: format(nd, 'dd'),
    dayDisplay: format(nd, 'd'),
    month: format(nd, 'MM'),
    monthDisplay: format(nd, 'MMM'),
    year: format(nd, 'y'),
    weekday: format(nd, 'EEEE'),
  };

  switch (action.type) {
    case 'ADD_ITEM': {
      const newState = { ...state, items: state.items.concat(action.item) };
      saveState(newState);
      return newState;
    }
    case 'UPDATE_ITEM': {
      const newItems = state.items.map((i: { key: any }) => {
        if (i.key === action.item.key) {
          return { ...i, status: action.item.status };
        }
        return i;
      });
      const newState = { ...state, items: newItems };
      saveState(newState);
      return newState;
    }
    case 'DELETE_ITEM': {
      const newState = {
        ...state,
        items: state.items.filter(
          (item: { key: any }) => item.key !== action.item.key,
        ),
      };
      saveState(newState);
      return newState;
    }
    case 'RESET_ALL': {
      const newItems = state.items
        .filter((item: { status: string }) => item.status !== 'completed')
        .map((i: { status: string }) => {
          if (i.status === 'paused') {
            return { ...i, status: 'pending' };
          }
          return i;
        });
      const newState = { ...state, items: newItems, date: currentDate };
      saveState(newState);
      return newState;
    }
    default:
      return state;
  }
};

// @ts-ignore
export function AppStateProvider({ children }) {
  let initialState = loadState();

  if (initialState === undefined) {
    const nd = new Date();

    initialState = {
      items: [],
      date: {
        day: format(nd, 'dd'),
        dayDisplay: format(nd, 'd'),
        month: format(nd, 'MM'),
        monthDisplay: format(nd, 'MMM'),
        year: format(nd, 'y'),
        weekday: format(nd, 'EEEE'),
      },
    };
  }

  saveState(initialState);

  const value = useReducer(appStateReducer, initialState);
  return (
    <div className="App">
      {/* @ts-ignore */}
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </div>
  );
}
