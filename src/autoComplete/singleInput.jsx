import React from 'react';
import BaseInput from './input';

export default class InputDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    onMenuVisibilityChange = (isOpen) => {
        this.setState({
            open: isOpen
        });
    }
    render() {
        const { value, options, onChange, renderItem } = this.props;
        const { open } = this.state;
        return (
            <BaseInput
                value={value}
                options={options}
                onChange={onChange}
                renderItem={renderItem}
                onMenuVisibilityChange={this.onMenuVisibilityChange}
                open={open}
            />
        )
    }
}