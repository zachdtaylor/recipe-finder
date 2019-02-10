import React from 'react'
import Button from './Button'

const Home = (props) => {
  return (
    <div>
      <h1>Let's Get Started</h1>
      <Button page="/findrecipe" text="Make a Meal" class="button-main"/>
      <Button page="/addrecipe" text="+ Add a Recipe" class="button-main"/>
    </div>
  )
}

export default Home