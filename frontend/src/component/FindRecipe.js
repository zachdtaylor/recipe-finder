import React from 'react'
import ListBuilder from './ListBuilder'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'
import { Button } from 'element-react'
import 'element-theme-default'

class FindRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listText: "",
      ingredients: [],
      queryFinished: false,
      data: null
    }
  }

  arrayContainsArray = (superset, subset) => {
    superset = superset.map(val => this.format(val))
    return subset.every(val => {
      return superset.indexOf(this.format(val)) >= 0
    })
  }

  format = str => str.toLowerCase().trim()

  query = () => {
    this.props.client.query({
      query: gql`
        query {
          recipe {
            name
            instructions
            ingredients {
              name
            }
          }
        }`
    }).then(res => {
      console.log(res)
      let data = res.data.recipe.filter(recipe => 
        this.arrayContainsArray(recipe.ingredients.map(item => item.name),
                               this.state.ingredients))
      this.setState({ data: data, queryFinished: true })
    })
  }

  handleListTextChange = value => {
    this.setState({ listText: value })
  }

  addIngredient = () => {
    this.state.ingredients.push(this.state.listText)
    this.setState({ listText: "" })
  }

  removeIngredient = ingredient => {
    this.setState({ ingredients: this.state.ingredients.filter(item => item !== ingredient)})
  }

  render() {
    if (this.state.queryFinished) {
      return(
        <Redirect to={{
          pathname: '/chooserecipe',
          state: { data: this.state.data, ingredients: this.state.ingredients }
        }}/>
      )
    }

    return (
      <form>
        <h1>What Ingredients Do You Have?</h1>
        <ListBuilder addItem={this.addIngredient}
                     removeItem={this.removeIngredient}
                     items={this.state.ingredients}
                     listText={this.state.listText}
                     handleChange={this.handleListTextChange}
                     width="400px"/>
        <Button type="button"  onClick={this.query}>Submit</Button>
      </form>
    )
  }
}

export default withApollo(FindRecipe)