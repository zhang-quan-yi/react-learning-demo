import React from 'react';
import StateUpdate from './example/stateUpdate';
import StateUpdatePure from './example/stateUpdatePure';
// import MyEditor from './draft/index';
import MyEditor from './draft-plugin/index';

import './App.css';
import test from './test.css';

import 'draft-js-mention-plugin/lib/plugin.css';


console.log(test);

function App() {
    return (
        <div className="App">
            {/* <StateUpdate /> */}
            {/* <StateUpdatePure /> */}
            {/* <MyEditor /> */}
        </div>
    );
}

export default App;
