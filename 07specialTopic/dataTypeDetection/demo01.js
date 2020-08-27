const _instanceof = (object, Constructor) => {
  let proto = Object.getPrototypeOf(object);
  while (proto) {
    if (proto === Constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};
