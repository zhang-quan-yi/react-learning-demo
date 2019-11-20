/**
 * 跨层级的组件移动
 */
import React from 'react';

export default class Root extends React.Component {
    constructor(props){
        super(props)
        console.log('Root constructor');
        this.state = {
            move: true,
        };
    }
    
    componentDidUpdate(){
        console.log('Root componentDidUpdate');
    }

    toggleMove = ()=>{
        this.setState({
            move: !this.state.move
        });
    };

    render() {
        console.log('Root render');
        const a = <A />;
        return (
            <div onClick={this.toggleMove}>
                {
                    this.state.move?a:null
                }
                <D a={this.state.move?null:a} />
            </div>
        );
    }
}

class A extends React.Component {
    constructor(props){
        super(props)
        console.log('A constructor');
    }
    render() {
        console.log('A render');
        return (
            <div>
                <B />
                <C />
            </div>
        );
    }
}

class B extends React.Component {
    constructor(props){
        super(props)
        console.log('B constructor');
    }
    render() {
        console.log('B render');
        return (
            <div>B...</div>
        );
    }
}

class C extends React.Component {
    constructor(props){
        super(props)
        console.log('C constructor');
    }
    render() {
        console.log('C render');
        return (
            <div>C...</div>
        );
    }
}

class D extends React.Component {
    constructor(props){
        super(props)
        console.log('D constructor');
    }
    componentDidUpdate(){
        console.log('D componentDidUpdate');
    }
    render() {
        console.log('D render');
        return (
            <div>
                D...
                {
                    this.props.a
                }
            </div>
            
        );
    }
}