import React from 'react'
import { Button, Input } from 'element-react'
import 'element-theme-default'
import "../stylesheets/ListBuilder.css"

class ListBuilder extends React.Component {

  handleEnterPressed = event => {
    if (event.key === 'Enter') {
      event.preventDefault() // So the page doesn't refresh
      this.props.addItem(event)
    }
  }

  render() {
    return (
      <div className="container">
        <div>
        <Input type="text" placeholder="Type Ingredient (return to add)" value={this.props.listText} 
               className="input" onChange={this.props.handleChange} 
               onKeyPress={this.handleEnterPressed}/>
        </div>
        <div className="list-container">
          <ul className="ingredientList">
            {this.props.items.map((item, i) => 
            <li key={i}>
            <div style={{display: "table", width: "100%"}}>
              <div className="list-item">
                {item}
                <Button nativeType="button" className="button-remove" 
                        onClick={() => this.props.removeItem(item)}>
                  Remove
                </Button>
              </div>
            </div>
            </li>)}
          </ul>
        </div>
        
      </div>
    )
  }
}

export default ListBuilder


/* <Button nativeType="button" className="button-add" onClick={this.props.addItem}>Add</Button><br/> */








