import Button from './Button'

const Buttons = {
    Add: ({callback,disabled}) => <Button label='Add' variant={'success'} callback={callback} disabled={disabled} />,
    Accept: ({callback,disabled}) => <Button label='Accept' variant={'primary'} callback={callback} disabled={disabled} />,
    Close: ({callback,disabled}) => <Button label='X' variant={'light'} callback={callback} disabled={disabled} />,
    Edit: ({callback,disabled}) => <Button label='Edit' variant={'info'} callback={callback} disabled={disabled} />,
    Update: ({callback,disabled}) => <Button label='Update' variant={'success'} callback={callback} disabled={disabled} />,
    Save: ({callback,disabled}) => <Button label='Save' variant={'primary'} callback={callback} disabled={disabled} />,
    Cancel: ({callback,disabled}) => <Button label='Cancel' variant={'warning'} callback={callback} disabled={disabled} />,
    Delete: ({callback,disabled}) => <Button label='Remove' variant={'danger'} callback={callback} disabled={disabled} />,
    Remove: ({callback,disabled}) => <Button label='X' variant={'warning'} callback={callback} disabled={disabled} />,
    More_Items: ({callback,disabled,toggle}) => <Button label={toggle?'More Items':'Add Items'} variant={'info'} callback={callback} disabled={disabled} />,
    Add_Items: ({callback,disabled}) => <Button label='Add Items' variant={'info'} callback={callback} disabled={disabled} />,
    Inspect: ({callback,disabled,label}) => <Button label={'Inspect '+label} variant={'info'} callback={callback} disabled={disabled} />,
    Search: ({callback,disabled}) => <Button label='Search' variant={'primary'} callback={callback} disabled={disabled} />,
    Scan: ({callback,disabled}) => <Button label={'Scan'} variant={'secondary'} callback={callback} disabled={disabled} />,
    Done: ({callback,disabled}) => <Button label='Done' variant={'success'} callback={callback} disabled={disabled} />,
}


export default Buttons;