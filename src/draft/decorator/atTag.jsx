import React from 'react';

const styles = {
    tag: {
        color: 'lightblue',
        fontWeight: 'bold'
    }
}

function AtTag(props) {
    console.log('_________ AtTag _________',props);
    return <span style={styles.tag}>{props.children}</span>;
}

export default AtTag;