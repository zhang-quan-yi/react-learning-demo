import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

class AddTodo extends React.Component {
    componentDidMount() {
        console.log('[AddTodo] componentDidMount');
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[AddTodo] componentDidUpdate');
    }
    render() {
        console.log('[AddTodo] render');
        const {
            dispatch
        } = this.props;
        let input;

        return (
            <div>
                <form
                    onSubmit={e => {
                        e.preventDefault()
                        if (!input.value.trim()) {
                            return
                        }
                        dispatch(addTodo(input.value))
                        input.value = ''
                    }}
                >
                    <input
                        ref={node => {
                            input = node
                        }}
                    />
                    <button type="submit">Add Todo</button>
                </form>
            </div>
        )
    }
}
AddTodo = connect()(AddTodo)

export default AddTodo