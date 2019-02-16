import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'element-react'
import 'element-theme-default'
import '../stylesheets/Button.css'

const StyledButton = (props) => {
  return (
    <Link to={props.page}>
      <Button className={props.class}>
        {props.text}
      </Button>
    </Link>
  )
}

export default StyledButton