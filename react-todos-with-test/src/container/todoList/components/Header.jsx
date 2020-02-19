import React, { useState } from 'react';

const Header = (props) => {
  const [value, setValue] = useState('');
  const onChange = e => setValue(e.target.value);
  const onKeyUp = (e) => {
    if (value === '') {return;}
    if (e.target.keyCode === 13) {
      props.addItem(value);
    }
  };
  return (
    <div>
      <input value={value} type="text" onKeyUp={onKeyUp} onChange={onChange} data-test="input"/>
    </div>
  );
};

export default Header;
