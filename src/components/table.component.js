import React, { Component, useState } from 'react';

const TableRow = (props) => {
  const { i, data, schema, action, actionName } = props;
  return(
    <tr>
      <td>
      </td>
      {schema.map(s => {
        return <td>{data[s.value]}</td>
      })}
      {action
        ? <td>
            <button onClick={(e) => action(data,i,e)}>{actionName}</button>
          </td>
        : null
      }
    </tr>
  )
}

export default function Table(props) {
    const { list, schema, action, actionName } = props;
    return (
      <div>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              {schema.map((s,i) => {
                return <th key={i}>{s.title}</th>
              })}
            </tr>
          </thead>
            {list.map((data,i) => {
              return(
                <TableRow
                  key={i}
                  schema={schema}
                  action={action}
                  actionName={actionName}
                  data={data}
                />
            )})}
          <tbody>
          </tbody>
        </table>
      </div>
    )
}
