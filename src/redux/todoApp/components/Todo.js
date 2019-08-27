import React from 'react';
import PropTypes from 'prop-types';

class Todo extends React.Component {
    componentDidMount() {
        console.log('[Todo] componentDidMount');
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Todo] componentDidUpdate');
    }
    render() {
        console.log('[Todo] render');
        const { onClick, completed, text } = this.props;
        return (
            <li
                onClick={onClick}
                style={{
                    textDecoration: completed ? 'line-through' : 'none'
                }}
            >
                {text}
            </li>
        );
    }
}

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export default Todo;