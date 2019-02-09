import React from 'react'
import { Link } from 'react-router-dom'
import '../stylesheets/Button.css'

const Button = (props) => {
  return (
    <Link to={props.page}>
      <button className={props.class}>
        {props.text}
      </button>
    </Link>
  )
}

export default Button