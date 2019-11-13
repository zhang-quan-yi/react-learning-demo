import { createStore, compose } from 'redux';
import rootReducer from './combineReducers';
import middleware from './middleware';

const store = createStore(rootReducer, middleware);
const onChange = () => {
    console.log(store.getState());
};

store.subscribe(onChange);
// store.dispatch((d)=>{
//     d({ type: 'change-1',path: [] });
// });
// store.dispatch({ type: 'change' });
// store.dispatch({ type: 'change-1' });
// store.dispatch({ type: 'change-1',path: []});

// const d1 = (a) => {
//     console.log('d1:', a);
//     return a + ' d1 ';
// };

// const d2 = (a) => {
//     console.log('d2:', a);
//     return a + ' d2 '
// };

// const fi = compose(d1, d2);
// fi(1);
store.dispatch((dispatch,getState)=>{
    dispatch({ type: 'change-1' ,path: []});
});
