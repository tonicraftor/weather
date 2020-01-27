/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Current } from '../dataRequest/dataTypes';

type StateObj = {
  cityCurrent: Current | null,
}

const initialState: StateObj = {
  cityCurrent: null,
};

const slice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrent: (state: StateObj, action: PayloadAction<Current>) => {
      // eslint-disable-next-line no-param-reassign
      const newState = { ...state, cityCurrent: action.payload };
      return newState;
    },
    setError: (state: StateObj, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      const newState = { ...state };
      return newState;
    },
  },
})

export const { reducer, actions } = slice;
