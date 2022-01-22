import { useState,  } from 'react';

import Buttons from '../atoms/Buttons'

const InspectionBox = (props) => {
    const [inspect,setInspect] = useState(false);
    
    return (
      <div id='inspection_box' className='row pt-3'>
        <div className='container-fluid'>
            <div className='row row-col-1'>
              <Buttons.Inspect label={props.name} callback={() => setInspect(!inspect)} />
              <div className='col'>{true && inspect && props.children}</div>
            </div>
          </div>
      </div>
    )
}

export default InspectionBox;