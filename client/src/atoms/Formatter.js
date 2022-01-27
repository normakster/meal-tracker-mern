const Formatter = {
    WithLabel: function WithLabel({label,children}) {
        return (
            <div className=''>
                <div className='input-group'>
                    <span className="input-group-text">{label}</span>
                    {children}
                </div>
            </div>
        )
    },

    InputItem: function InputItem({obj,dispatch,action,title,field}) {
        return (
            <div className='col col-sm-6 col-auto'>
                <div className='input-group'>
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