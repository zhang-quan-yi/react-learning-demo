import { combineReducers } from 'redux';

const reducer1 = function (state = { name: 'reducer1', change: 0 }, action) {
    switch (action.type) {
        case 'change-1':
        case 'change':
            return {
                ...state,
                change: state.change + 1,
            }
        default:
            return state;
    }
};

const reducer2 = function (state = { name: 'reducer2', change: 0 }, action) {
    switch (action.type) {
        case 'change-2':
        case 'change':
            return {
                ...state,
                change: state.change + 1,
            }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    reducer1,
    reducer2
});
export default rootReducer;