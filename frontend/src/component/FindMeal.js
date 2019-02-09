import React from 'react'
import ListBuilder from './ListBuilder'
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom'

class FindMeal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listText: "",
      ingredients: [],
      queryFinished: false,
      data: null
    }
  }

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
      this.setState({ data: res.data, queryFinished: true })
    })
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value })
  }

  handleListTextChange = event => {
    this.setState({ listText: event.target.value })
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
          state: { data: this.state.data.recipe }
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
                     handleChange={this.handleListTextChange}/>
        <button type="button"  onClick={this.query}>Submit</button>
      </form>
    )
  }
}

export default withApollo(FindMeal)