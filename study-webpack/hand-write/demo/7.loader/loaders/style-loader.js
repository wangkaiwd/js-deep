function loader (content) {
  return `
    const style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(content)};
    document.head.appendChild(style);
  `;
}

module.exports = loader;
