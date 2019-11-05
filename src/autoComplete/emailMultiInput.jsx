import React from 'react';
import BaseInput from './input';
import styles from './emailMultiInput.css';

export default class EmailMultiInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: props.options,
            open: false,
            isFocus: false,
        };
        this.inputProps = {
            onKeyUp: this.onKeyUp,
            onClick: this.onClick,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
        };
        this.preInput = '';
        this.currentInput = '';
    }

    onClick = () => {
        this.setState({
            open: true
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

    onKeyUp = (e) => {
        if (!this.preInput && e.keyCode === 8) {
            // 删除
            const selectValue = this.props.value.slice();
            if (selectValue.length > 1) {
                selectValue.splice(selectValue.length - 2, 1);
                this.props.onChange && this.props.onChange(selectValue);
            }
            this.setState({
                open: false
            });
        } else if (e.keyCode === 186) {
            this.onChange(e.target.value.substr(0, e.target.value.length - 1), { action: 'select' });
        }
        if (!this.state.open && e.target.value) {
            this.setState({
                open: true
            });
        }
        this.preInput = this.currentInput;
        // console.log('onKeyUp value code', e.target.value, e.keyCode);
    };

    renderItem = (item, isHighlighted) => (
        <div style={{ background: isHighlighted ? 'aliceblue' : 'white' }} className="auto-complete-opt-item">
            {`${item.name}<${item.value}>`}
        </div>
    );

    onChange = (inputValue, opt) => {
        const selectValue = this.props.value.slice();
        let newInputValue = '';
        if (!selectValue.length) {
            newInputValue = '';
            selectValue.push({ value: newInputValue });
        }

        if (opt.action === 'select' && inputValue) {
            newInputValue = '';
            selectValue.splice(selectValue.length - 1, 0, { value: inputValue });
            selectValue[selectValue.length - 1] = { value: newInputValue };
        } else {
            newInputValue = inputValue;
            selectValue[selectValue.length - 1] = { value: newInputValue };
        }

        if (opt.action === 'select' || opt.action === 'clear') {
            this.preInput = newInputValue;
        }

        this.currentInput = newInputValue;
        this.props.onChange && this.props.onChange(selectValue);
        this.props.onQueryChange && this.props.onQueryChange(newInputValue);
        console.log('onChange');
    };

    onMenuVisibilityChange = (isOpen) => {
        console.log('onMenuVisibilityChange');
        this.setState({
            open: isOpen
        });
    };

    onSelectItemKeyUp = (e) => {
        if (e.keyCode === 8) {
            console.log('onSelectItemKeyUp', e.target.getAttribute('tabindex'));
            this.disSelect(e.target.getAttribute('tabindex'));
        }
    };

    disSelect = (index) => {
        const selectValue = this.props.value.slice();
        selectValue.splice(index, 1);
        console.log(selectValue);
        this.props.onChange && this.props.onChange(selectValue);
    };

    render() {
        const { value, options } = this.props;
        const { open, isFocus } = this.state;
        const self = this;
        let newOptions = options;
        let inputValue = '';
        let selectValue = [];
        if (Array.isArray(value) && value.length) {
            selectValue = value.slice(0, -1);
            const lastItem = value[value.length - 1];
            inputValue = lastItem.value;
        }
        if (selectValue.length || options.length) {
            const obj = {};
            selectValue.forEach(item => {
                obj[item.value] = item;
            });
            newOptions = options.filter(item => (!obj[item.value]));
        }
        return (
            <div className={`formItem multiInput ${isFocus?'focus':''}`}>
                {
                    selectValue.map((item, index) => (
                        <div key={index} className='selectedItem' tabIndex={index} onKeyUp={self.onSelectItemKeyUp}>
                            {item.value};
                        </div>
                    ))
                }
                <BaseInput
                    value={inputValue}
                    options={newOptions}
                    onChange={this.onChange}
                    renderItem={this.renderItem}
                    inputProps={this.inputProps}
                    onMenuVisibilityChange={this.onMenuVisibilityChange}
                    open={open}
                />
            </div>
        )
    }
}