import React from 'react'
import { Button, Input, MessageBox } from 'element-react'
import 'element-theme-default'
import "../stylesheets/ListBuilder.css"

class ListBuilder extends React.Component {

  handleContextFind = () => {
    if (/\d/.test(this.props.listText)) {
      MessageBox.alert('Please don\'t specify an amount. Only the ingredient name is needed!', 
                       'Name Only', {
        confirmButtonText: 'OK',
        confirmButtonClass: 'button-confirm',
        showClose: false
      })
    } else {
      this.props.addItem()
    }
  }

  handleContextAdd = () => {
    if (/\d/.test(this.props.listText)) {
      this.props.addItem()
    } else {
      MessageBox.alert('Please enter an amount along with the ingredient.', 'Amount Needed', {
        confirmButtonText: 'OK',
        confirmButtonClass: 'button-confirm',
        showClose: false
      })
    }
  }

  handleEnterPressed = event => {
    if (event.key === 'Enter') {
      event.preventDefault() // So the page doesn't refresh

      if (this.props.context === 'find') {
        this.handleContextFind()
      } else {
        this.handleContextAdd()
      }
    }
  }

  render() {
    return (
      <div className="listbuilder-container">
        <Input type="text" placeholder="Ingredient (return to add)" value={this.props.listText} 
               className="input" onChange={this.props.handleChange} 
               onKeyPress={this.handleEnterPressed}/>
          <div className="list-container">
            <ul className="ingredientList">
              {this.props.items.map((item, i) => 
              <li key={i}>
              <div style={{display: "table", width: "100%"}}>
                <div className="list-item">
                  {item}
                </div>
                <Button nativeType="button" className="button-remove" 
                          onClick={() => this.props.removeItem(item)}>
                    Remove
                </Button>
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








