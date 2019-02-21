import React from 'react'
import StyledButton from './StyledButton'
import '../stylesheets/Home.css'

const Home = (props) => {
  return (
    <div className="home-content">
      <div className="home-middle">
        <h1 className="home-title">Let's Get Started</h1>
        <div className="home-buttons">
          <div className="home-buttons-grid">
            <StyledButton page="/findrecipe" text="Make a Meal" class="button-main"/>
            <StyledButton page="/addrecipe" text="+ Add a Recipe" class="button-main"/>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home