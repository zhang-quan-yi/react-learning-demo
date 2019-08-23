import React from 'react';
import Select, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';

const options = [
    { value: 1, label: 'quanyi', email: 'quanyi@126.com' },
    { value: 2, label: 'langke', email: 'langke@126.com' },
    { value: 3, label: 'hailei', email: 'hailei@126.com' },
];

const customStyles = {
    dropdownIndicator: (provided, state) => ({
        display: 'none'
    }),
    control: (provided, state) => ({
        border: 'transparent'
    }),
};

const customStyles2 = {
    dropdownIndicator: (provided, state) => ({
        display: 'none'
    }),
    control: (provided, state) => ({
        border: 'transparent'
    }),
    indicatorsContainer: ()=>({
        display: 'none'
    }),
    multiValue: (provided, state) => ({
        backgroundColor: 'transparent'
    }),
    multiValueLabel: (provided, state) => ({
        backgroundColor: 'transparent'
    }),
    multiValueRemove: (provided, state) => ({
        display: 'none'
    })
};

const formatOptionLabel = (option, arg2) => {
    // console.log(option, arg2);
    return (
        <span>
            <span>{option.label}</span>
            {
                option.email ?
                    (<span>&lt;{option.email}&gt;</span>)
                    :
                    null
            }
        </span>
    );
};

const getOptionLabel = (option) => {
    console.log(option, option.label);
    return `${option.label} <${option.email}>`;
}

const formatCreateLabel = (value) => {
    return <span>{value}</span>
}

const customComponents = {
    MultiValue: ({ children, ...props }) => {
        return (
            <components.MultiValue {...props}>{children};&nbsp;</components.MultiValue>
        )
    }
}

export default () => (
    <div>
        <div style={{ margin: '20px' }}>
            <CreatableSelect
                styles={customStyles}
                defaultValue={options[1]}
                options={options}
                formatOptionLabel={formatOptionLabel}
                formatCreateLabel={formatCreateLabel}
                onFocus={() => { }}
            />
        </div >
        <div style={{ margin: '20px' }}>
            <Select
                isMulti
                delimiter=";"
                components={customComponents}
                styles={customStyles2}
                defaultValue={options[1]}
                options={options}
                formatOptionLabel={formatOptionLabel}
            />
        </div>
    </div>
);