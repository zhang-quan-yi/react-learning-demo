import React from 'react';

const styles = {
    link: {
        backgroundColor: '#ddd',
        color: 'blue',
        textDecoration: 'underline',
    }
}

function Link(props) {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url} style={styles.link}>
            {props.children}
        </a>
    );
}

export default Link;