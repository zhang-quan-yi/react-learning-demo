import React from 'react';
import SingleInput from './singleInput';
import EmailMultiInput from './emailMultiInput';
const options = [
    { id: 1, name: 'quanyi', value: 'quanyi1@126.com' },
    { id: 2, name: 'langke', value: 'langke2@126.com' },
    { id: 3, name: 'hailei', value: 'hailei3@126.com' },
];

export default class InputDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            options,
            options2: options,
            multiValue: []
        }
    }

    renderItem = (item, isHighlighted) => (
        <div style={{ background: isHighlighted ? 'aliceblue' : 'white' }} key={item.id} className="auto-complete-opt-item">
            {`${item.name}<${item.value}>`}
        </div>
    )

    onChange = (value, opt) => {
        this.setState({
            value,
            options: options.filter(item => {
                return (item.value.indexOf(value) !== -1) || (item.name.indexOf(value) !== -1)
            })
        });
    }

    onMultiChange = (value) => {
        this.setState({
            multiValue: value,
        });
    }

    onQueryChange = (query) => {
        this.setState({
            options2: options.filter(item => {
                return (item.value.indexOf(query) !== -1) || (item.name.indexOf(query) !== -1)
            })
        });
    }

    render() {
        const { value, options, options2, multiValue } = this.state;
        return (
            <div style={{ padding: '30px' }}>
                <div style={{ display: 'flex' }}>
                    <SingleInput
                        value={value}
                        options={options}
                        onChange={this.onChange}
                        renderItem={this.renderItem}
                    />
                </div>
                <EmailMultiInput
                    value={multiValue}
                    options={options2}
                    onChange={this.onMultiChange}
                    renderItem={this.renderItem}
                    onQueryChange={this.onQueryChange}
                />
            </div>
        )
    }
}