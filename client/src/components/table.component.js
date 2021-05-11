export const TblRowSet = ({ layout, keys, data, headerFormat, rowFormat }) => {
  return (
    <div className='container'>
      <div className={layout.row}>
      {
        keys.map((key,i) => {
          return (
            <div className={layout.col} key={i}>
              <div className={layout.row}>
                {headerFormat(key)}
              </div>
              <div className={layout.row}>
                {rowFormat(data[key])}
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

  // <div className={layout.row}>
  // </div>
export const Tbl = ({ layout, keys, data, headerFormat, rowFormat }) => {
  return (
    <div className='container'>
      {header(layout,keys,headerFormat)}
      {row(layout,keys,data,rowFormat)}
    </div>
  )
}

function header(layout,keys,format) {
  return (
    <div className={layout.row}>
    {
      keys.map((key,i) => {
        return (
          <div className={layout.col} key={i}>
          {format(key)}
          </div>
        )
      })
    }
    </div>
  )
}

function row(layout,keys,data,format) {
  return data.map((item,i) => {
    return (
      <div className={layout.row} key={i}>
      {
        keys.map((key,k) => {
          return (
            <div className={layout.col} key={k}>
            {format(item[key])}
            </div>
          )
        })
      }
      </div>
    )
  })
}
