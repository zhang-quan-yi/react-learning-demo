import React from 'react';
import './index.css';

class C1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'C1'
        };
    }
    componentDidUpdate() {
        console.log(`[${this.state.name}] did update`);
    }

    render() {
        console.log(`[${this.state.name}] render`);
        return (
            <div className="container">
                <div>{this.state.name} (father:{this.props.father})</div>
            </div>
        );
    }
}

class C2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'C2',
        };
    }
    componentDidUpdate() {
        console.log(`[${this.state.name}] did update`);
    }

    render() {
        console.log(`[${this.state.name}] render`);
        return (
            <div className="container">
                <div>{this.state.name}</div>
            </div>
        );
    }
}

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Root',
            alias: 'r',
        };
        this.update = this.update.bind(this);
        this.updateNothing = this.updateNothing.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.name !== nextState.name ||
            this.state.alias !== nextState.alias
        );
    }
    componentDidUpdate() {
        console.log(`[${this.state.name}] did update`);
    }
    updateNothing() {
        this.setState({});
    }
    update() {
        this.setState({
            name: 'Root_v' + Math.ceil(Math.random() * 1000)
        });
    }
    render() {
        console.log(`[${this.state.name}] render`);
        return (
            <div className="container">
                <div onClick={this.update}>{this.state.name}</div>
                <div className="children">
                    <C1 father={this.state.name} />
                    <C2 />
                </div>
                <button onClick={this.updateNothing}>update nothing</button>
                <button onClick={this.update}>update name</button>
            </div>
        )
    }
}

export default Root;