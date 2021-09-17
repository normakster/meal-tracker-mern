// Utility Functions
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'



export function FormItem({obj,onChange,title,className,field,name}) {
  return (
      <Form.Group key={field}>
        <Form.Label >{title}</Form.Label>
        <Form.Control type='text' className={className} placeholder={field} name={name} value={obj[field]} onChange={onChange} />
      </Form.Group>
  )
}

export function InputItem({obj,onChange,title,className,field}) {
  return (
    <div key={field}>
        {title && <label>{title}</label>}
        <input type='text' className={className} placeholder={field} name={field} value={obj[field]}
          onChange={onChange} />
    </div>
  )
}

export function Assembled({ Head, Body, override, items }) {
  function callback(Body) {
    return items.map((item,index) => <tr key={index} >
      <Body item={item} index={index} />
    </tr>)
  }
  return (
    <Table bordered hover>
      <thead><tr><Head /></tr></thead>
      <tbody>
        {items && (override || callback(Body))}
      </tbody>
    </Table>
  )
}


export function merge(target,source) {
  Object.keys(source).forEach(key => {
    if (source[key] && typeof source[key] === 'object') {
      merge((target[key] = target[key] || source[key]),source[key])
    }
    target[key] = source[key];
  });
  return target;
}

export function nest(field,value) {
  const keys = field.split('.');
  for(var acc={},parent=acc,i=0,j=keys.length;i<j;i++) {
    if(i!==j-1) {
      parent = ( parent[keys[i]]={} )
    } else {
      parent = ( parent[keys[i]]=value )
    }
  }
  return acc
}

export function nestMerge(arr,value) {
  for(var obj={},acc=obj,i=0,j=arr.length;i<j;i++) {
    [nest(arr[i],value)].reduce(merge,acc);
  }
  return obj
}

export function str2obj(acc,path,value) {
  let keys = path.split('.'), key;
  const last = keys.pop();
  while(key=keys.shift()) {
    if( typeof acc[key] !== 'object' ) acc[key]={};
    acc = acc[key];
  }
  acc[last]=value;
}

export function copyDeep(oldObj) {
  return JSON.parse(JSON.stringify(oldObj))
}

export function copyShallow(oldObj,newValues) {
  return Object.assign({}, oldObj, newValues)
}

export function updateObject(oldObj,newValues) {
  return copyShallow(oldObj,newValues)
}

export function updateItemInArray(arr, itemId, callback) {
  // const updatedItems = arr.map(item => {
  return arr.map(item => {
    if(item.id !== itemId) {
      return item
    }
    // const updatedItem = callback(item)
    // return updatedItem
    return callback(item)
  })
  // return updatedItems
}

export function createReducer(initialState, handlers) {
  // makes a generic reducer function
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      // handler matching to make reducer = (state,action) => {}
      return handlers[action.type](state,action)
    } else {
      return state
    }
  }
}

// module.exports = {
//
// }
