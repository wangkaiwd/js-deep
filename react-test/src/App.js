import React from 'react';

function App () {
  return (
    // 可以使用data-test自定义属性来标记dom属性，通过enzyme来的api来进行选择
    <div className="App" title="test title" data-test="app">
      hello world
    </div>
  );
}

export default App;
