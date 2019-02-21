import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import '../stylesheets/App.css';
import Home from './Home'
import FindRecipe from './FindRecipe'
import AddRecipe from './AddRecipe'
import ChooseRecipe from './ChooseRecipe';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fRListText: "",
      fRIngredients: []
    }
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

  render() {
    return (
      <Router>
        <div className="app">
          <ul className="navbar">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li className="menu"><Link to="/addrecipe" className="nav-link">Add Recipe</Link></li>
            <li className="menu"><Link to="/findrecipe" className="nav-link">Make Meal</Link></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/findrecipe" 
                   render={props => <FindRecipe {...props} 
                                                ingredients={this.state.fRIngredients}
                                                listText={this.state.fRListText}
                                                addIngredient={this.findRecipeAddIngredient}
                                                handleListTextChange={this.findRecipeListTextChange}
                                                removeIngredient={this.findRecipeRemoveIngredient}/>
            }/>
            <Route path="/addrecipe" component={AddRecipe}/>
            <Route path="/chooserecipe" component={ChooseRecipe}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;