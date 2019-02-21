import React from 'react'
import ListBuilder from './ListBuilder'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'
import { Button } from 'element-react'
import 'element-theme-default'
import '../stylesheets/FindRecipe.css'

class FindRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
                                this.props.ingredients))
      this.setState({ data: data, queryFinished: true })
    })
  }

  render() {
    if (this.state.queryFinished) {
      return(
        <Redirect to={{
          pathname: '/chooserecipe',
          state: { data: this.state.data, ingredients: this.props.ingredients }
        }}/>
      )
    }

    return (
      <div className="container">
        <h1 style={{fontSize: "48px"}}>What Ingredients Do You Have?</h1>
        <ListBuilder addItem={this.props.addIngredient}
                     removeItem={this.props.removeIngredient}
                     items={this.props.ingredients}
                     listText={this.props.listText}
                     handleChange={this.props.handleListTextChange}/>
        <Button type="button" className="button-submit" onClick={this.query}>Submit</Button>
      </div>
    )
  }
}

export default withApollo(FindRecipe)