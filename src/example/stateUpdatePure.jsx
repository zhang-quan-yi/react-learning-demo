import React from 'react';

export default class StateUpdate extends React.PureComponent {
    state = {
        person: {
            info: {
                name: 'hello'
            }
        }
    };
    updateName1 = () => {
        this.state.person.info.name = 'world' + Math.random();
        this.setState({});
    };

    updateName2 = () => {
        let {person} = this.state;

        person.info.name = 'world' + Math.random();
        this.setState({
            person: {
                ...person
            }
        });
    };

    render() {
        return (
            <div>
                <h3>Pure Component State Update</h3>
                <button onClick={this.updateName1}>no replace person object</button>
                <button onClick={this.updateName2}>replace person object</button>
                <div>{this.state.person.info.name}</div>
            </div>
        );
    }
}