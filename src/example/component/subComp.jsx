import React from 'react';

export default class SubComp extends React.Component {
    state={};
    constructor(props) {
        super(props);
        console.log('[SubComp] constructor');
    }
    static getDerivedStateFromProps(props, state) {
        console.log('[SubComp] getDerivedStateFromProps');
        return null;
    }
    componentDidMount() {
        console.log('[SubComp] componentDidMount');
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[SubComp] shouldComponentUpdate');
    //     return nextProps !== this.props;
    // }
    getSnapshotBeforeUpdate(){
        console.log('[SubComp] getSnapshotBeforeUpdate');
        return null;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[SubComp] componentDidUpdate');
    }
    render() {
        console.log('[SubComp] render');
        return (
            <div>
                <h2>SubComp</h2>
                <div>{this.props.content}</div>
            </div>
        )
    }
}