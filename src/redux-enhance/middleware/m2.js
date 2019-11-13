export default function m2() {
    return ({ dispatch, getState }) => next => action => {
        if (action.path) {
            action.path.push('middleware 2');
        }
        console.log('m2 in', action);
        return next(action);
    };
}