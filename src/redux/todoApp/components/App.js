import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

class App extends React.Component {
    componentDidMount() {
        console.log('[App] componentDidMount');
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[App] componentDidUpdate');
    }
    render() {
        console.log('[App] render');
        return (
            <div>
                <AddTodo />
                <VisibleTodoList />
                <Footer />
            </div>
        )
    }
}

export default App