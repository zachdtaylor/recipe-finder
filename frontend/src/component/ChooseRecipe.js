import React from 'react'

class ChooseRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: props.location.state.data
    }
  }

  render() {
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