# 浅析 React 组件状态更新

## `state` 和 `props`

`state` 是组件自身的状态，在组件中可以通过 `setState` 方法修改 `state` 的值。
`props` 是组件从外部获取的状态，在组件中，`props`的值是只读的，不可以修改。

## 组件如何触发自身的更新机制？

当组件的 `state` 或者 `props` 改变时，组件就会更新。但是，对于一个组件来说，`props`是只读、不可更改的。一个组件，要主动触发更新机制，需要使用 `setState` 方法。
下面，通过一个简单的示例，来了解 `setState` 的使用方式。
如图所示，`Root` 组件包含了子组件 `C1` 和 `C2`，组件 `C1` 包含了子组件 `C3`：

![组件结构](https://raw.githubusercontent.com/zhang-quan-yi/blogs/master/resource/react_state_update/p1.png)

示例代码一：
```jsx
// Root component
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
```

```jsx
// C1 compoent
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
```

```jsx
// C3 component
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
```

```jsx
// C2 component
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
```

此时，如果我们点击 `C3` 组件的标题，就会触发 `update` 方法，执行 `setState` 方法，改变 `state` 中 `name` 的值，在 `C3` 组件的名称后面，出现了一串随机数字。控制台的输出结果表示， `C3` 的 `render` 方法执行了，如下图所示：
![结果](https://raw.githubusercontent.com/zhang-quan-yi/blogs/master/resource/react_state_update/p2.png)


如果我们点击组件 `C1` 的标题，组件 `C1` 将会更新，`C1` 名字后面增加了一串随机数字，同时它的子组件 `C3` 的内容也更新了，结果如下：
![结果](https://raw.githubusercontent.com/zhang-quan-yi/blogs/master/resource/react_state_update/p3.png)

通过控制台的输出，可以发现，`C1` 和 `C3` 的 `render` 方法都执行了。那么为什么组件 `C2` 没有更新呢？为什么它的 `render` 方法没有执行呢？

接下来，点击组件 `Root` 的标题，可以发现组件树中的所有组件都更新了。也就是说，组件 `Root`，以及它的所有子节点都更新了，结果如下：
![结果](https://raw.githubusercontent.com/zhang-quan-yi/blogs/master/resource/react_state_update/p4.png)

**至此，可以得出结论：组件通过调用 `setState` 方法触发自身更新，同时，也会触发它的所有子节点更新。**

## 每次调用 `setState` ，即使没有状态改变，组件也会更新吗？

构建如下组件结构：

![组件结构2](https://raw.githubusercontent.com/zhang-quan-yi/blogs/master/resource/react_state_update/p2_1.png)

在 `Root` 组件中，有两个按钮 `update nothing` 和 `update name`。
`update nothing` 按钮执行了 `setState({})` 语句，它不改变任何状态。
`update name` 按钮通过调用 `setState` 方法来修改 `Root` 组件的名称。

示例代码二：

```jsx
// Root
class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Root'
        };
        this.update = this.update.bind(this);
        this.updateNothing = this.updateNothing.bind(this);
    }
    componentDidUpdate(){
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
```

```jsx
// C1
class C1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'C1'
        };
    }
    componentDidUpdate(){
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
```

```jsx
// C2
class C2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'C2',
        };
    }
    componentDidUpdate(){
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
```
现在，点击按钮 `update nothing`，页面没有任何更新，因为我们没有更改任何状态，仅仅执行了 `setState({})`，但控制台的输出却出乎意料，组件 `Root`、`C1` 和 `C2` 的 `render` 函数都执行了，并且 `componentDidUpdate` 生命周期钩子也都执行了：

![输出结果2_2](https://raw.githubusercontent.com/zhang-quan-yi/blogs/master/resource/react_state_update/p2_2.png)

那么点击按钮 `update name` 会有什么结果呢？
当然，页面上，组件 `Root` 都名字会更新，并且控制台会输出和之前一样的内容


![输出结果2_3](https://raw.githubusercontent.com/zhang-quan-yi/blogs/master/resource/react_state_update/p2_3.png)


**结论，即使不改变任何状态，调用 `setState` 方法，也会触发组件，及其子组件的更新。**

>注意：不传入任何参数，仅仅执行 `setState()`，并不会触发组件更新。

如果对于 `setState` 的这种行为有所顾忌，那么该如何优化呢？

## 通过 [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) 或者 [shouldComponentUpdate](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) 控制组件更新

通过上节，我们知道，只要调用 `setState` 方法并传入参数，组件就会更新，触发一系列生命周期钩子。为了解决这个问题，可以使用 `PureComponent` 来优化性能。

对上面的示例代码二，做以下修改：

