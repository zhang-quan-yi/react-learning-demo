export default function m1() {
    return ({ dispatch, getState }) => next => action => {
        if (action.path) {
            action.path.push('middleware 1');
        }
        console.log('m1 in', action);
        return next(action);
    };
}