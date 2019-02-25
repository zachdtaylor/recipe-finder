import React from 'react'
import '../stylesheets/ListBuilder.css'

const StaticList = props => {
  return (
    <div className="staticlist-container">
      <ul className="ingredientList">
        {props.items.map((item, i) => 
        <li key={i}>
          <div style={{display: "table", width: "100%"}}>
            <div className="list-item">
              {item}
            </div>
          </div>
        </li>)}
      </ul>
    </div>
  )
}

export default StaticList