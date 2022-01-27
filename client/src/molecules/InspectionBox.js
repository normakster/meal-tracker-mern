import { useState,  } from 'react';

import Buttons from '../atoms/Buttons'

const InspectionBox = (props) => {
    const [inspect,setInspect] = useState(false);
    
    return (
      <div id='inspection_box' className=''>
      {/* <div id='inspection_box' className='row pt-3'>
        <div className='container-fluid'>
            <div className='row row-col-1'> */}
              <br />
              <hr />
              <Buttons.Inspect name={props.name} callback={() => setInspect(!inspect)} />
              {true && inspect && props.children}
      </div>
    )
}

export default InspectionBox;