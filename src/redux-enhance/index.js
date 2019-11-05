import { createStore } from 'redux';
import rootReducer from './combineReducers';

const store = createStore(rootReducer);
const onChange = () => {
    console.log(store.getState());
};

store.subscribe(onChange);

store.dispatch({ type: 'change' });
store.dispatch({ type: 'change-1' });
store.dispatch({ type: 'change-1' });