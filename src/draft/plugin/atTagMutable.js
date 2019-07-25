import React from 'react';

class AtTag extends React.Component {
    static isAtTagOn = true;
    state = {
        users: [
            'raymond',
            'quanyi',
            'hailei',
            'langke'
        ]
    };
    render() {
        const props = this.props;
        return (
            <div className="at-tag-wrap">
                <span className="at-tag-text">{props.children}</span>
                <div className="at-pop">

                </div>
            </div>
        );
    }

    componentWillUnmount() {
        AtTag.isAtTagOn = false;
    }
}


const handleKeyCommand = null;
const keyBindingFn = null;
const decorator = null;
export default {
    keyBindingFn,
    handleKeyCommand
};