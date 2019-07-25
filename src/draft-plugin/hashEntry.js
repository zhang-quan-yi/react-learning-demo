import React from 'react';

const hashEntry = (props) => {
    const {
      mention,
      theme,
      searchValue, // eslint-disable-line no-unused-vars
      isFocused, // eslint-disable-line no-unused-vars
      ...parentProps
    } = props;
    console.log('hashEntry',props);
    return (
      <div {...parentProps}>
        <div>
          <span>{mention.key}</span>
          &nbsp;&nbsp;
          <span>{mention.content}</span>
        </div>
      </div>
    );
  };

  export default hashEntry;