import React from 'react'

const Button = ({value, onClick, isDisabled, className}) => {
  return (
    <>
    <button className={`mx-4 py-1 px-2 bg-green-500 hover:bg-green-600 text-white text-lg rounded-lg ${className}`} onClick={onClick} >{value}</button>
    </>
  )
}

export default Button
