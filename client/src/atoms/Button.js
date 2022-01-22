const Button = (props) => {
    const { label, variant, callback, disabled } = props;
    return (
        <input type='button' className={'col btn btn-'+variant+' mx-2'} onClick={callback} value={label} disabled={disabled} />
    )
}

export default Button