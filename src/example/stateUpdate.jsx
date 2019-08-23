import React from 'react';

export default class StateUpdate extends React.Component {
    state = {
        person: {
            info: {
                name: 'hello',
                desc: 'we are defferent'
            }
        }
    };
    updateName1 = () => {
        // this.state.person.info.name = 'world' + Math.random();
        this.setState({});
    };

    updateName2 = () => {
        let { person } = this.state;

        person.info.name = 'world' + Math.random();
        this.setState({
            person: {
                ...person
            }
        });
    };

    render() {
        console.log('render');
        return (
            <div>
                <h3>Component State Update</h3>
                <button onClick={this.updateName1}>no replace person object</button>
                <button onClick={this.updateName2}>replace person object</button>
                <div>{this.state.person.info.name}</div>
                <div>{this.state.person.info.desc}</div>
                {
                    this.props.children
                }
            </div>
        );
    }
}