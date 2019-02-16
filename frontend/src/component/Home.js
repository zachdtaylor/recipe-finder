import React from 'react'
import StyledButton from './StyledButton'

const Home = (props) => {
  return (
    <div>
      <h1>Let's Get Started</h1>
      <StyledButton page="/findrecipe" text="Make a Meal" class="button-main"/>
      <StyledButton page="/addrecipe" text="+ Add a Recipe" class="button-main"/>
    </div>
  )
}

export default Home