import React, { useState } from 'react';

const Header = () => {
  const [value, setValue] = useState('');
  const onChange = e => setValue(e.target.value);

  return (
    <div>
      <input value={value} type="text" onChange={onChange} data-test="input"/>
    </div>
  );
};

export default Header;
