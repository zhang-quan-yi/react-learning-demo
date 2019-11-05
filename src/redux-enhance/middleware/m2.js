export default function m2() {
    return ({ dispatch, getState }) => next => action => {
        const result = next(action);
        if (action.path) {
            action.path.push('middleware 2');
        }
        console.log('before after', action, result);
        return next(action);
    };
}