import { React, useState } from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { toast } from "react-toastify"
import axios from "axios"
import {useNavigate} from "react-router-dom"


const TodoInput = () => {

  const [inputWork, setInputWork] = useState("")
  const [inputCreateDate, setInputCreateDate] = useState("")
  const [inputEndDate, setInputEndDate] = useState("")
  const navigate  = useNavigate();


  const handleWorkChange = (e) => {
    setInputWork(e.target.value)
  }

  const handleCreatedDateChange = (e) => {
    setInputCreateDate(e.target.value)
  }

  const handleEndDateChange = (e) => {
    setInputEndDate(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!inputCreateDate || !inputEndDate || inputWork.length === 0) {
        toast.error("Fields are Empty", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        })
      }
      else {
        const response = await axios.post("http://localhost:5000/", {inputWork, inputCreateDate, inputEndDate})

        if(response.status !==200){
          toast.error(response.data.message)
        }
        else{
          toast.success("Task Added Successfully");
          setInputCreateDate('')
          setInputEndDate('')
          setInputWork("")

        }
      }
    }
    catch(error) {
      console.log(error)
    }
  }



  return (
    <>
      <div className='w-screen h-screen flex flex-col gap-20 justify-center items-center'>
        <h1 className='text-xl md:text-6xl font-bold text-violet-800'>Todo List</h1>
        <div className='w-11/12 h-fit py-6 shadow-2xl bg-purple-300 rounded-xl'>
          <form action="">
            <div className='my-5 mx-3 flex flex-col lg:flex-row justify-around gap-10'>
              <div className="flex flex-col w-full">
                <span className='text-lg font-semibold text-indigo-500'>Task:</span>
                <InputField type="text" value={inputWork} onChange={handleWorkChange} placeholder="Work" />
              </div>
              <div className='flex flex-col'>
                <span className='text-lg font-semibold text-indigo-500'>Created Date: </span>
                <InputField type="date" value={inputCreateDate} onChange={handleCreatedDateChange} className="w-36" />
              </div>

              <div className='flex flex-col'>
                <span className='text-lg font-semibold text-indigo-500'>End Date: </span>
                <InputField type="date" value={inputEndDate} onChange={handleEndDateChange} className="w-36" />
              </div>
            </div>
            <Button value="Add Task" onClick={handleSubmit}/>
          </form>
        </div>

      <Button value="Go to Todo" onClick={()=> navigate("./todo")} className= "bg-purple-500 text-white hover:bg-purple-600"/> 
      </div>
    </>
  )
}

export default TodoInput
