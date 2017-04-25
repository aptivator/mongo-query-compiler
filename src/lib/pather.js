export default (parent, child) => {
  if(!parent) {
    return child;
  }
  
  if(!child) {
    return parent;
  }
  
  return parent + '.' + child;
};
