export default function m1() {
    return ({ dispatch, getState }) => next => action => {
        const result = next(action);
        if (action.path) {
            action.path.push('middleware 1');
        }
        console.log('before after', action, result);
        return next(action);
    };
}