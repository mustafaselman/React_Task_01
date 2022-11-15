import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Profile from "./profile.webp"

function Cards() {
    const [userList,setUserList] = useState([]);
    const navigate = useNavigate();
    const users = async () => {
        try{
        const userData = await axios("https://jsonplaceholder.typicode.com/users");
            setUserList(userData.data)
        }
        catch(error){
            console.log(error.message)
        }
    } 
    useEffect(()=>{
       users(); 
    },[])
    
    
  return (
    <div className='container d-flex flex-row flex-wrap'>
        
        {
            userList.map((user,index)=>{

                return(
                    <div className="card text-center m-1" style={{width: "13rem"}}key={index}>
                    <img className="card-img-top" src={Profile} alt="..."/>
                    <div className='card-body d-flex flex-column'>
                    <h1 className="card-title">{user.id}</h1>
                    <h3 className="card-title mb-auto">{user.name}</h3>
                    <button onClick={()=>{
                        navigate("/info",{state:user})
                    }} className="btn btn-primary">Todos</button>
                    </div>
                </div>
                )
                
                
            })
        }
    </div>
  )
}

export default Cards