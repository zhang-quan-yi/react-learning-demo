import { applyMiddleware } from 'redux';
import trunk from 'redux-thunk';
import m1 from './m1';
import m2 from './m2';

export default applyMiddleware(trunk, m1(), m2());