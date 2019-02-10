import React from 'react'

class ChooseRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: props.location.state.data
    }
  }

  render() {
    console.log("Choose Recipe state:", this.state.recipes)
    if (this.state.recipes.length === 0) {
      return (
        <div>
          <h1>Choose a Recipe</h1>
          Sorry, you haven't stored any recipes that you can make with those ingredients!
        </div>
      )
    }

    return (
      <div>
        <h1>Choose a Recipe</h1>
        <ul>
        {this.state.recipes.map((recipe, i) =>
          <li key={i}>
            {recipe.name}
              <ul>
                <li>{recipe.instructions}</li>
                <li>
                  Ingredients:
                  <ul>
                    {recipe.ingredients.map((item, j) => <li key={j}>{item.name}</li>)}
                  </ul>
                </li>
              </ul>
          </li>
        )}
        </ul>
      </div>
    )
  }
}

export default ChooseRecipe