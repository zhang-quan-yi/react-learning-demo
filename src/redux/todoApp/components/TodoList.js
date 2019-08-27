import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

class TodoList extends React.Component {
    componentDidMount() {
        console.log('[TodoList] componentDidMount');
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[TodoList] componentDidUpdate');
    }
    noop() { }
    render() {
        console.log('[TodoList] render');
        const { todos, onTodoClick } = this.props;
        return (
            <ul>
                {
                    todos.map((todo, index) => (
                        <Todo
                            key={todo.id}
                            {...todo}
                            onClick={this.noop}
                        />
                    ))
                }
            </ul>
        );
    }
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    onTodoClick: PropTypes.func.isRequired
}

export default TodoList