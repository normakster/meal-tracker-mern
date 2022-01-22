// Utility Functions

module.exports = {
  str2obj: function str2obj(acc,path,value) {
    let keys = path.split('.'), key;
    const last = keys.pop();
    while(key=keys.shift()) {
      if( typeof acc[key] !== 'object' ) acc[key]={};
      acc = acc[key];
    }
    acc[last]=value;
  },
  merge: function merge(source,target) {
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object') {
        merge(source[key],(source[key] = target[key] || source[key]))
      }
      target[key] = source[key];
    });
    return target;
  },
  update: function update(target,source) {
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object') {
        update((target[key] = target[key] || source[key]),source[key])
      }
      target[key] = source[key];
    });
    return target;
  },
  copyDeep: function copyDeep(source) {
    return JSON.parse(JSON.stringify(source))
  },
  copyShallow: function copyShallow(source,target) {
    return Object.assign({}, source, target)
  },
  updateObject: function updateObject(source,target) {
    return copyShallow(source,target)
  },
  updateItemInArray: function updateItemInArray(arr, itemId, callback) {
    return arr.map(item => {
      if(item.id !== itemId) {
        return item
      }
      return callback(item)
    })
  },
}
