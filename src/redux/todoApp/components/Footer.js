import React from 'react'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters } from '../actions'

class Footer extends React.Component {
  componentDidMount() {
    console.log('[Footer] componentDidMount');
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Footer] componentDidUpdate');
  }
  render() {
    console.log('[Footer] render');
    return (
      <p>
        Show: <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
        {', '}
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
        {', '}
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
      </p>
    )
  }
}

export default Footer