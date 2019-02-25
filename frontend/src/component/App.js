import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import '../stylesheets/App.css'
import Home from './Home'
import FindRecipe from './FindRecipe'
import AddRecipe from './AddRecipe'
import ChooseRecipe from './ChooseRecipe'
import DisplayRecipe from './DisplayRecipe'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'
import { saveAs } from 'file-saver'
import logo from '../files/logo.png'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fRListText: "",
      fRIngredients: [],
      cRRecipes: [],
      queryFinished: false
    }
  }

  downloadShoppingList = ingredients => {
    let blob = new Blob(["It worked!"], {type: "text/plain;charset=utf-8"})
    saveAs(blob, "testFile.txt")
  }

  findRecipeAddIngredient = () => {
    this.state.fRIngredients.push(this.state.fRListText)
    this.setState({ fRListText: "" })
  }

  findRecipeListTextChange = value => {
    this.setState({ fRListText: value })
  }

  findRecipeRemoveIngredient = ingredient => {
    this.setState({ fRIngredients: this.state.fRIngredients.filter(item => item !== ingredient)})
  }

  storeRecipeResults = recipes => {
    this.setState({ cRRecipes: recipes })
  }

  recipeContainsIngredients = (superset, subset) => {
    superset = superset.map(val => this.format(val)).join(" ")
    return subset.every(val => {
      return superset.includes(this.format(val))
    })
  }

  resetQueryState = () => {
    this.setState({ queryFinished: false })
  }

  format = str => str.toLowerCase().trim()

  query = () => {
    this.props.client.query({
      fetchPolicy: 'network-only',
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
        this.recipeContainsIngredients(recipe.ingredients.map(item => item.name),
                                       this.state.fRIngredients))
      this.setState({ cRRecipes: data, queryFinished: true })
    })
  }

  render() {
    return (
      <Router>
        <div className="app">
          <ul className="navbar">
            <li className="home">
              <Link to="/" className="nav-link-logo">
                <img src={logo} alt="Recipe Finder Logo" style={{height: "32px", width: "160px"}}/>
              </Link>
            </li>
            <li className="menu"><Link to="/addrecipe" className="nav-link">Add Recipe</Link></li>
            <li className="menu"><Link to="/findrecipe" className="nav-link">Find Recipe</Link></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/findrecipe" 
                   render={props => <FindRecipe {...props} 
                                                ingredients={this.state.fRIngredients}
                                                listText={this.state.fRListText}
                                                addIngredient={this.findRecipeAddIngredient}
                                                handleListTextChange={this.findRecipeListTextChange}
                                                removeIngredient={this.findRecipeRemoveIngredient}
                                                storeRecipeResults={this.storeRecipeResults}
                                                queryFinished={this.state.queryFinished}
                                                query={this.query}/>
            }/>
            <Route path="/addrecipe" component={AddRecipe}/>
            <Route path="/chooserecipe" 
                   render={props => <ChooseRecipe {...props}
                                                  recipes={this.state.cRRecipes}
                                                  resetQueryState={this.resetQueryState}/>
            }/>
            <Route path="/displayrecipe" 
                   render={props => <DisplayRecipe {...props}
                                                   downloadShoppingList={this.downloadShoppingList}/>}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default withApollo(App);