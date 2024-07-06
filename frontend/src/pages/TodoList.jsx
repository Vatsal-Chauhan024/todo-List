import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from "../components/Button";
import { toast } from 'react-toastify';
import { Link, useNavigate} from 'react-router-dom';


const TodoList = () => {
  const [apiResponse, setApiResponse] = useState([]);
  const [readOnlyStates, setReadOnlyStates] = useState([]);
  const [inputDateCreated, setInputDateCreated] = useState([]);
  const [inputEndDate, setInputEndDate] = useState([]);
  const [inputWork, setInputWork] = useState([]);
  const navigate =  useNavigate()

  useEffect(() => {
    axios.get("http://localhost:5000/todo")
      .then((result) => {
        const initialReadOnlyStates = Array(result.data.length).fill(true);
        setApiResponse(result.data);
        setReadOnlyStates(initialReadOnlyStates);
        setInputDateCreated(result.data.map(item => item.inputCreateDate));
        setInputEndDate(result.data.map(item => item.inputEndDate));
        setInputWork(result.data.map(item => item.inputWork));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formatISODate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  
  

  const handleEdit = (key) => {
    const newReadOnlyStates = [...readOnlyStates];
    newReadOnlyStates[key] = !newReadOnlyStates[key];
    setReadOnlyStates(newReadOnlyStates);
  

    const taskId = apiResponse[key]._id;
  
    const patchData = {
      _id: taskId,
      inputWork: inputWork[key],
      inputDateCreated: inputDateCreated[key],
      inputEndDate: inputEndDate[key],
    };
  
    axios
      .patch('http://localhost:5000/todo', patchData)
      .then((response) => {
        toast.info(response.data.message, {
          position: "top-right",
          autoClose: 1000,
          theme: "light",
      });
      
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleDelete = (key) => {
  const taskId = apiResponse[key]._id;

  axios
    .delete(`http://localhost:5000/todo?_id=${taskId}`)
    .then((response) => {
      toast.success(response.data.message, {
        
          position: "top-right",
          autoClose: 1000,
          theme: "light",
      });
      const updatedApiResponse = [...apiResponse];
      updatedApiResponse.splice(key, 1); 
      setApiResponse(updatedApiResponse);
    })
    .catch((error) => {
      toast.error(error);
    });
};

  

  const handleInputChange = (key, field, value) => {
    if (field === 'inputDateCreated') {
      const newInputDateCreated = [...inputDateCreated];
      newInputDateCreated[key] = value;
      setInputDateCreated(newInputDateCreated);
    } else if (field === 'inputEndDate') {
      const newInputEndDate = [...inputEndDate];
      newInputEndDate[key] = value;
      setInputEndDate(newInputEndDate);
    } else if (field === 'inputWork') {
      const newInputWork = [...inputWork];
      newInputWork[key] = value;
      setInputWork(newInputWork);
    }
  };

  return (
  
    <div className='w-screen h-full flex flex-col gap-20 justify-center items-center'>
      <div className='w-fit p-5 bg-white shadow-lg rounded-md'>
        <h2 className='font-medium text-purple-500 text-3xl'>Your Tasks:</h2>
      </div>
      <table className="table-auto w-5/6 h-auto">
        <thead>
          <tr className='border-2 border-solid'>
            <th className='border-r-2 border-solid'>Task</th>
            <th className='border-r-2 border-solid px-4'>Created Date</th>
            <th className='border-r-2 border-solid '>End Date</th>
            <th className='px-4 border-r-2 border-solid'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {apiResponse.length > 0 ? (
      
            apiResponse.map((element, key) => (
              <>
              <tr key={key} className='border-2 border-solid'>
                <td className='text-center px-2 py-2 border-r-2 border-solid'>
                  <input
                    type='text'
                    value={inputWork[key]}
                    readOnly={readOnlyStates[key]}
                    onChange={(e) => handleInputChange(key, 'inputWork', e.target.value)}
                    className='outline-none border-2 border-solid shadow-xl w-full p-2 rounded-md'
                  />
                </td>
                <td className='text-center px-2 border-r-2 border-solid'>
                  <input
                    type='date'
                    value={formatISODate(inputDateCreated[key])}
                    readOnly={readOnlyStates[key]}
                    onChange={(e) => handleInputChange(key, 'inputDateCreated', e.target.value)}
                    className='outline-none shadow-xl border-2 border-solid p-2 text-sm lg:text-base lg:w-full  text-center '
                  />
                </td>
                <td className='text-center px-2 border-r-2 border-solid'>
                  <input
                    type='date'
                    value={formatISODate(inputEndDate[key])}
                    readOnly={readOnlyStates[key]}
                    onChange={(e) => handleInputChange(key, 'inputEndDate', e.target.value)}
                    className='outline-none shadow-xl border-2 border-solid p-2 text-sm lg:text-base lg:w-full  text-center'
                  />
                </td>
                <td>
                  <span className='w-full flex justify-center items-center '>
                    <Button value="Edit" className="bg-indigo-500 text-white hover:bg-indigo-600" onClick={() => handleEdit(key)} />
                    <Button value="Delete" className="bg-red-500 text-white hover:bg-red-600"  onClick={()=> handleDelete(key)}/>
                  </span>
                </td>
              </tr>
              <button className='text-white bg-purple-500 px-6 py-3 text-xl mt-7 rounded-md hover:bg-purple-600' onClick={() => navigate(-1)}>Go Back</button>
              </>
            ))
          ) : (
            
            <Link to = "/"><button className='text-white bg-purple-500 px-6 py-3 text-xl mt-7 rounded-md hover:bg-purple-600' >Add Task</button></Link>
          )}
        </tbody>
      </table>



    </div>
  );
};

export default TodoList;
