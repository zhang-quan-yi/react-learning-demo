# REACT UPDATE

## React 调用 setState 的更新机制
1. 默认 this.props !== nextProps || this.state !== nextState
2. PureComponent this.props.keys !== nextProps.keys || this.state.keys !== nextState.keys