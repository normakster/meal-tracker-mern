const ButtonGroup = (props) => {
    return (
        <div className='row p-2 border border-info mt-3'>
            <div className='container-fluid border border-info'>
                <div className='row row-col-1'>
                    {props.children}
                </div>
            </div>
        </div>
      )
  }
  
  export default ButtonGroup;