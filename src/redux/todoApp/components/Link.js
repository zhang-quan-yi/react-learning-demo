import React from 'react'
import PropTypes from 'prop-types'

class Link extends React.Component {
    componentDidMount() {
        console.log('[Link] componentDidMount');
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Link] componentDidUpdate');
    }
    render() {
        console.log('[Link] render');
        const { active, children, onClick } = this.props;
        if (active) {
            return <span>{children}</span>
        }

        return (
            <a
                href=""
                onClick={e => {
                    e.preventDefault()
                    onClick()
                }}>
                {children}
            </a>
        );
    }
}

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Link