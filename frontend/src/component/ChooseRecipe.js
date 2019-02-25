import React from 'react'
import { Redirect } from 'react-router-dom'
import StyledButton from './StyledButton'
import '../stylesheets/ChooseRecipe.css'

class ChooseRecipe extends React.Component {
  constructor(props) {
    super(props)
    props.resetQueryState()
    this.state = {
      clickedRecipe: null
    }
  }

  handleRecipeClick = idx => {
    this.setState({ clickedRecipe: this.props.recipes[idx] })
  }

  render() {
    if (this.props.recipes.length === 0) {
      return (
        <div>
          <h1 className="choose-title">Choose a Recipe</h1>
          Sorry, we couldn't find any recipes that you can make with those ingredients!<br/>
          <StyledButton page="/findrecipe" text="Back to Ingredient List" class="button-back"/>
        </div>
      )
    }

    if (this.state.clickedRecipe) {
      let recipe = this.state.clickedRecipe
      return (
        <Redirect to={{
          pathname: "/displayrecipe",
          state: {
            ingredients: recipe.ingredients.map(item => item.name),
            title: recipe.name,
            instructions: recipe.instructions
          }
        }}/>
      )
    }

    return (
      <div>
        <h1 className="choose-title">Choose a Recipe</h1>
        <div className="choose-scrollmenu">
        {this.props.recipes.map((recipe, i) =>
          <div key={i} onClick={() => this.handleRecipeClick(i)}>
            {recipe.name}
          </div>
        )}
        </div>
        <StyledButton page="/findrecipe" text="Back to Ingredient List" class="button-back"/>
      </div>
    )
  }
}

export default ChooseRecipe








/* <ul>
<li>{recipe.instructions}</li>
<li>
  Ingredients:
  <ul>
    {recipe.ingredients.map((item, j) => <li key={j}>{item.name}</li>)}
  </ul>
</li>
</ul> */