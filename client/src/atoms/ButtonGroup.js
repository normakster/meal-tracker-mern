const ButtonGroup = (props) => {
    return (
        <div className=''>
            <div className='d-grid gap-2 d-md-block'>
                {props.children}
            </div>
        </div>
    )
  }
  
  export default ButtonGroup;
