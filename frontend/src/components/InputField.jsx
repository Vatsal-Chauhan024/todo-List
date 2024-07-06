import React from 'react'

const InputField = ({value, onChange, placeholder, type, className}) => {
  return (
    <>
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}  className={`w-full py-3 px-2 border-[1px] solid grey rounded-md outline-none ${className}`}/>
    </>
  )}


export default InputField
