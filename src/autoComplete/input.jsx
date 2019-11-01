import React from 'react';
import Autocomplete from 'react-autocomplete';

export default function (props) {
    let renderItem = props.renderItem;
    if (!renderItem) {
        renderItem = (item, isHighlighted) => (
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.label}
            </div>
        );
    }

    const {
        value,
        options,
        inputProps,
        open,
        onMenuVisibilityChange,
    } = props;

    const onChange = (e) => {
        props.onChange && props.onChange(e.target.value, { action: 'input' });
    };

    const onSelect = (value) => {
        console.log('onselect', value);
        props.onChange && props.onChange(value, { action: 'select' });
    };

    const getItemValue = (item) => item.value

    const clear = () => {
        props.onChange && props.onChange('', { action: 'clear' });
    };

    return (
        <div>
            <Autocomplete
                getItemValue={getItemValue}
                items={options}
                renderItem={renderItem}
                value={value}
                onChange={onChange}
                onSelect={onSelect}
                inputProps={inputProps}
                onMenuVisibilityChange={onMenuVisibilityChange}
                open={open}
            />
            <span onClick={clear}>clear</span>
        </div>
    );
}