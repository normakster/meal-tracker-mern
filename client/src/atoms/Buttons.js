import Button from './Button'

const Buttons = {
    Add: (props) => <Button label='Add' variant={'success'} {...props} />,
    Accept: (props) => <Button label='Accept' variant={'primary'} {...props} />,
    Close: (props) => <Button label='X' variant={'outline-danger'} width='col-1' {...props} />,
    Edit: (props) => <Button label='Edit' variant={'secondary'} {...props} />,
    Update: (props) => <Button label='Update' variant={'success'} {...props} />,
    Save: (props) => <Button label='Save' variant={'primary'} {...props} />,
    Cancel: (props) => <Button label='Cancel' variant={'warning'} {...props} />,
    Delete: (props) => <Button label='Remove' variant={'danger'} {...props} />,
    Remove: (props) => <Button label='X' variant={'warning'} {...props} />,
    More_Items: (props) => <Button label={'More Items'} variant={'outline-info'} {...props} />,
    Add_Items: (props) => <Button label='Add Items' variant={'outline-info'} {...props} />,
    Inspect: (props) => <Button label={'Inspect '+props.name} variant={'light btn-sm'} {...props} />,
    Search: (props) => <Button label='Search' variant={'primary'} {...props} />,
    Scan: (props) => <Button label={'Scan'} variant={'secondary'} {...props} />,
    Done: (props) => <Button label='Done' variant={'success'} {...props} />,
    Process: (props) => <Button label='Process' variant={'success'} {...props} />,
}


export default Buttons;