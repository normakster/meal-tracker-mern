const Button = (props) => {
    const { label, variant, width, callback, disabled } = props;
    return (
        <button type='button' 
            className={'btn btn-'+
                variant+
                ' '+
                (width?width:'col-md-2')+
                ' '} 
            onClick={callback} 
            disabled={disabled} 
        >{label}</button>
    )
}

export default Button