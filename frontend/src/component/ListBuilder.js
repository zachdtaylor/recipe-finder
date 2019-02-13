import React from 'react'

const ListBuilder = props => {
  return (
    <div>
      <input type="text" value={props.listText} onChange={props.handleChange}/>
      <button type="button" onClick={props.addItem}>Add</button><br/>
      <ul>
        {props.items.map((item, i) => 
        <li key={i}>
          {item}<button type="button" onClick={() => props.removeItem(item)}>Remove</button>
        </li>)}
      </ul>
    </div>
  )
}

export default ListBuilder