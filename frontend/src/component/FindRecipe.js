import React from 'react'
import ListBuilder from './ListBuilder'
import { Redirect } from 'react-router-dom'
import { Button } from 'element-react'
import 'element-theme-default'
import '../stylesheets/FindRecipe.css'

const FindRecipe = props => {
    if (props.queryFinished) {
      return(
        <Redirect to='/chooserecipe'/>
      )
    }

    return (
      <div className="container">
        <h1 style={{fontSize: "48px"}}>What Ingredients Do You Have?</h1>
        <ListBuilder addItem={props.addIngredient}
                     removeItem={props.removeIngredient}
                     items={props.ingredients}
                     listText={props.listText}
                     handleChange={props.handleListTextChange}
                     context="find"/>
        <Button type="button" className="button-submit" onClick={props.query}>Submit</Button>
      </div>
    )
}

export default FindRecipe