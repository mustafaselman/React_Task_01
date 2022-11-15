import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

function Info() {
    const location = useLocation();
    const user = location.state;
    const [allUserTodos,setAllUserTodos] = useState([])
    const [inputText,setInputText] = useState("")
    const [filteredTodo,setFilteredTodo] = useState([]);
   
    
    const allUsersTodos = async () => {
        try{
            const userTodosAPI = await axios(`https://jsonplaceholder.typicode.com/todos/?userId=${user.id}`)
            setAllUserTodos(userTodosAPI.data)
            // console.log(userTodosAPI.data)
        
        }catch(error){
            console.log(error.message)
        }
        
    }

    const handleDelete = (userTodo)=> { 
        
        setAllUserTodos(allUserTodos.filter(item => item.id !== userTodo.id))
        
    }

    const handleState = (userTodo) => {
        if(userTodo.completed)
            setAllUserTodos(allUserTodos.map(item => item.id === userTodo.id ? {...item, completed : false } : item))
        else
        setAllUserTodos(allUserTodos.map(item => item.id === userTodo.id ? {...item, completed : true } : item))
    }

    const handleChange = (input) => {
        setInputText(input)
      
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let userId= e.target.elements.userId.value
        let userTodos= e.target.elements.userTodos.value
        setAllUserTodos(prevState => [...prevState, {userId:user.id, id:userId, title:userTodos, completed:false}])
        e.target.elements.userId.value = ""
        e.target.elements.userTodos.value = ""
    }
    

    useEffect(()=>{
        allUsersTodos();
        
       
    },[])
   
  return (
    <div className='container d-flex flex-column flex-wrap align-items-center '>
   
        <input onChange={(e)=>handleChange(e.target.value)} value={inputText} className="form-control m-3 text-center" style={{width: "60rem"}} placeholder="Search Your Todos"/>
      
        <div className='d-flex flex-row flex-wrap'>

        {allUserTodos?.filter(item => item.title.includes(inputText)).map(userTodo => {
            return(
                <div className="card text-center m-1" style={{width: "13rem",height:"30rem"}}key={userTodo.id}>
            <div className='card-body d-flex flex-column'>
            <h1 className="card-title">{userTodo.id}</h1>
            <h3 className="card-title mb-auto">{userTodo.title}</h3>
                <h5 className="card-title">{userTodo.completed ? (<div className='text-success'>Completed</div>) : (<div className='text-danger'>notCompleted</div>)}</h5>
                <button onClick={()=> handleDelete(userTodo)}  className="btn btn-primary m-1">DELETE</button>
                <button onClick={()=> handleState(userTodo)}className="btn btn-primary">STATE UPDATE</button>
          
            
            </div>
        </div>
            )
        }
            
    )}
    <div className="card text-center m-1" style={{width: "13rem",height:"30rem"}}>
    <div className='card-body d-flex flex-column'>
            <form onSubmit={handleSubmit}>
            <input id="userId" className="form-control text-center" placeholder="Enter Id"/>
            <br/>
            <textarea id="userTodos" rows="12" type="text" className="form-control text-center "placeholder="Enter Todos"/>
            <br/>
            <button type="submit" className="btn btn-primary m-1">CREATE</button>
    </form>
    </div>
    </div>
    </div>

    </div>
  )
}

export default Info