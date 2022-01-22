import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import Formatter from './Formatter'

const Date_Picker = (props) => {
    const { datetime, callback } = props;
    return (
        <Formatter.WithLabel label='Date: ' >
          <DatePicker selected={datetime ? new Date(datetime) : null}
            onChange={callback}
            showTimeSelect timeFormat="HH:mm" dateFormat="MM-dd-yyyy HH:mm"
            timeIntervals={15} timeCaption="time"
          />
        </Formatter.WithLabel>
    )
}

export default Date_Picker