import React from 'react';
import SubComp from './subComp';
export default class ChildComp extends React.Component {
    state = {
        name: 'ChildComp',
        content2: 'content2',
    };
    constructor(props) {
        super(props);
        console.log('[ChildComp] constructor');
    }
    static getDerivedStateFromProps(props, state) {
        console.log('[ChildComp] getDerivedStateFromProps');
        return null;
    }
    componentDidMount() {
        console.log('[ChildComp] componentDidMount');
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[ChildComp] shouldComponentUpdate');
    //     return nextProps !== this.props;
    // }
    getSnapshotBeforeUpdate() {
        console.log('[ChildComp] getSnapshotBeforeUpdate');
        return null;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[ChildComp] componentDidUpdate');
    }
    update = () => {
        this.setState({
            name: 'ChildComp ' + Math.random()
        })
    };
    render() {
        console.log('[ChildComp] render');
        return (
            <div>
                <h2>{this.state.name}</h2>
                <div>ChildComp {this.props.content}</div>
                <div>
                    <SubComp content={this.state.content2} />
                </div>
                <div onClick={this.update}>更新</div>
            </div>
        )
    }
}