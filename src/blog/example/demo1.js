import React from 'react';
import './index.css';

class C1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: 'C1'
        };
        this.update = this.update.bind(this);
    }

    update(){
        this.setState({
            name: 'C1_v' + Math.ceil(Math.random() * 1000)
        });
    }

    render(){
        console.log(`[${this.state.name}] render`);
        return (
            <div className="container">
                <div onClick={this.update}>{this.state.name} (father:{this.props.father})</div>
                <div className="children">
                    <C3 father={this.state.name}/>
                </div>
            </div>
        );
    }
}

class C3 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: 'C3'
        };
        this.update = this.update.bind(this);
    }
    update(){
        this.setState({
            name: 'C3_v' + Math.ceil(Math.random() * 1000)
        });
    }
    render(){
        console.log(`[${this.state.name}] render`);
        return (
            <div className="container">
                <div onClick={this.update}>{this.state.name} (father:{this.props.father})</div>
            </div>
        )
    }
}

class C2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: 'C2',
        };
        this.update = this.update.bind(this);
    }
    update(){
        this.setState({
            name: 'C2_v' + Math.ceil(Math.random() * 1000)
        });
    }
    render(){
        console.log(`[${this.state.name}] render`);
        return (
            <div className="container">
                <div onClick={this.update}>{this.state.name} (father:{this.props.father})</div>
            </div>
        );
    }
}

class Root extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'Root'
        };
        this.update = this.update.bind(this);
    }
    update(){
        this.setState({
            name: 'Root_v' + Math.ceil(Math.random() * 1000)
        });
    }
    render(){
        console.log(`[${this.state.name}] render`);
        return (
            <div className="container">
                <div onClick={this.update}>{this.state.name}</div>
                <div className="children">
                    <C1 father={this.state.name} />
                    <C2 father={this.state.name} />
                </div>
            </div>
        )
    }
}

export default Root;