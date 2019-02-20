import React from 'react'
import { withApollo } from 'react-apollo'
import ListBuilder from './ListBuilder'
import '../stylesheets/AddRecipe.css'
import gql from 'graphql-tag'
import StyledButton from './StyledButton'
import { Input, Button } from 'element-react'
import 'element-theme-default'

class AddRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.emptyState = {
      title: "",
      listText: "",
      instructions: "",
      ingredients: [],
      mutationFinished: false
    }
    this.state = this.emptyState
  }

  handleTitleChange = value => {
    this.setState({ title: value })
  }

  handleInstructionsChange = event => {
    this.setState({ instructions: event.target.value })
  }

  handleListTextChange = value => {
    this.setState({ listText: value })
  }

  postRecipe = () => {
    this.props.client.mutate({
      variables: {
        title: this.state.title,
        instructions: this.state.instructions,
        ingredients: this.state.ingredients
      },
      mutation: gql`
        mutation AddRecipe($title: String!, $instructions: String!, $ingredients: [String!]) {
          addRecipe(name: $title,
                    instructions: $instructions,
                    ingredients: $ingredients) {
            recipe {
              name
            }
          }
        }`
    }).then(res => {
      console.log(res.data.addRecipe)
      this.setState(this.emptyState)
      this.setState({ mutationFinished: true })
    }).catch(error => console.log(error))
  }

  addIngredient = () => {
    this.state.ingredients.push(this.state.listText)
    this.setState({ listText: "" })
  }

  removeIngredient = ingredient => {
    this.setState({ ingredients: this.state.ingredients.filter(item => item !== ingredient)})
  }

  render() {
    if (this.state.mutationFinished) {
      return (
        <div>
          Your recipe was saved.<br/>
          <StyledButton page="/" class="button-to-home" text="Home"/>
        </div>
      )
    }

    return (
      <div className="content">
        <h1 style={{fontSize: "48px"}}>Add a Recipe</h1>
        <div className="wrapper">
          <div className="list-container">
            <ListBuilder addItem={this.addIngredient}
                         removeItem={this.removeIngredient}
                         items={this.state.ingredients}
                         listText={this.state.listText}
                         handleChange={this.handleListTextChange}
                         width="200px"/>
          </div>
          <div className="title-text-container">
            <Input type="text" placeholder="Title" onChange={this.handleTitleChange}/><br/>
            <Input className="textarea-instructions"
                   type="textarea"
                   placeholder="Instructions..."
                   onChange={this.handleInstructionsChange}/><br/>
          </div>
        </div>
        <Button className="button-save" nativeType="button" 
                onClick={this.postRecipe}>Save</Button>
      </div>
    )
  }
}

export default withApollo(AddRecipe)