import React from 'react';
import BaseInput from './input';

export default class InputDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isFocus: false,
        };
        this.inputProps = {
            onFocus: this.onFocus,
            onBlur: this.onBlur,
        };
    }
    onMenuVisibilityChange = (isOpen) => {
        this.setState({
            open: isOpen
        });
    };

    onFocus = () => {
        this.setState({
            isFocus: true
        });

        const { onFocus } = this.props;
        onFocus && onFocus();
    };

    onBlur = () => {
        this.setState({
            isFocus: false
        });
        const { onBlur } = this.props;
        onBlur && onBlur();
    };

    render() {
        const { value, options, onChange, renderItem } = this.props;
        const { open,isFocus } = this.state;
        return (
            <div className={`formItem ${isFocus?'focus':''}`}>
                <BaseInput
                    value={value}
                    options={options}
                    onChange={onChange}
                    renderItem={renderItem}
                    inputProps={this.inputProps}
                    onMenuVisibilityChange={this.onMenuVisibilityChange}
                    open={open}
                />
            </div>
        )
    }
}