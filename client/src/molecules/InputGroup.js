const InputGroup = (props) => {

    return (
        <div className='row row-cols-2 border border-info mt-3'>
            {props.children}
        </div>
    )
}

export default InputGroup