import React from 'react';
import Autocomplete from 'react-autocomplete';
import styles from './index.css';

const renderMenu = function (items, value, style) {
    return <div style={style} children={items} className="auto-complete-dropdown-menu" />
}

export default function (props) {
    let renderItem = props.renderItem;
    if (!renderItem) {
        renderItem = (item, isHighlighted) => (
            <div style={{ background: isHighlighted ? 'aliceblue' : 'white' }}>
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

    let newInputProps = {};
    if (inputProps) {
        newInputProps = {
            ...inputProps
        };
    }
    if (newInputProps.className) {
        newInputProps.className = 'auto-complete-input ' + newInputProps.className;
    } else {
        newInputProps.className = 'auto-complete-input';
    }
    const menuStyle = {
        borderRadius: '3px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '2px 0',
        fontSize: '14px',
        position: 'fixed',
        overflow: 'auto',
        maxHeight: '50%',
        zIndex: 2,
    };
    return (
        <Autocomplete
            getItemValue={getItemValue}
            items={options}
            renderItem={renderItem}
            value={value}
            onChange={onChange}
            onSelect={onSelect}
            inputProps={newInputProps}
            onMenuVisibilityChange={onMenuVisibilityChange}
            open={open}
            menuStyle={menuStyle}
            renderMenu={renderMenu}
        />
    );
}