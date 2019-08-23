import React from 'react';
import ChildComp from './component/childComp';


export default class ShouldUpdate extends React.Component {
    constructor(props) {
        super(props);
        console.log('[ShouldUpdate] constructor');
    }
    static getDerivedStateFromProps(props, state) {
        console.log('[ShouldUpdate] getDerivedStateFromProps');
        return null;
    }
    componentDidMount() {
        console.log('[ShouldUpdate] componentDidMount');
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[ShouldUpdate] shouldComponentUpdate');
    //     return (nextProps !== this.props) || (nextState !== this.state);
    // }
    getSnapshotBeforeUpdate() {
        console.log('[ShouldUpdate] getSnapshotBeforeUpdate');
        return null;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[ShouldUpdate] componentDidUpdate');
    }
    state = {
        person: {
            info: {
                name: 'hello',
                desc: 'we are defferent',
            },
            content1: 'content1',
            content2: 'content2',
        }
    };
    updateName1 = () => {
        // this.state.person.info.name = 'world' + Math.random();
        // this.state.person.content1 += ' change';
        // this.state.person.content2 += ' change';
        this.setState({});
    };

    updateName2 = () => {
        let { person } = this.state;

        person.info.name = 'world' + Math.random();
        person.content1 += ' change';
        person.content2 += ' change';
        this.setState({
            person: {
                ...person
            }
        });
    };

    render() {
        console.log('[ShouldUpdate] render');
        const {
            content1,
            content2,
        } = this.state.person;
        return (
            <div>
                <h3>Component Should Update</h3>
                <button onClick={this.updateName1}>no replace person object</button>
                <button onClick={this.updateName2}>replace person object</button>
                <div>{this.state.person.info.name}</div>
                <div>{this.state.person.info.desc}</div>
                <ChildComp content={content1}></ChildComp>
            </div>
        );
    }
}