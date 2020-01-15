import { createStore } from 'redux';
import { reducer } from './reducer';

export type IState = ReturnType<typeof reducer>;

export default () => {
  const store = createStore(reducer);
  return store;
};
