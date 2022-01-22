const Formatter = {
    WithLabel: function WithLabel({label,children}) {
        return (
            <div className='col'>
                <div className='input-group row'>
                    <span className="input-group-text">{label}</span>
                    {children}
                </div>
            </div>
        )
    },

    InputItem: function InputItem({obj,dispatch,action,title,field}) {
        return (
            <div className='col'>
                <div className='input-group row'>
                    <span className="input-group-text">{title}</span>
                    <input type="text" className="form-control" 
                        placeholder={field} name={field} value={obj[field]}
                        onChange={(e) => dispatch({type:action,payload:{key:field,value:e.target.value}})}
                    />
                </div>
            </div>
        )
    }
}

export default Formatter