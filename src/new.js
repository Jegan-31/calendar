import React from "react";
import { useEffect,useState } from "react";
import './new.css'
export const Jtable = () =>
{
 const[users,setusers]=useState([]);
 const[sorttype,setsortype]=useState();
 const [count,setCount]=useState(1);
 const [iconSort,setIconSort]=useState(true)
 useEffect(()=> {  getuser()   },[]);
 const getuser=()=>{
    fetch("https://reqres.in/api/users?page=2")
    .then(response => response.json())
    .then((data) => {
        console.log(data)
      setusers(data['data'])
    })
 }
 const sort=(value)=>
 {
 setsortype(value);
  
    const data = users.slice();
      if (count%2===0 ) {        data.sort((a, b) => (a[value] < b[value] ? 1 : -1));          
    setIconSort(false)
    } 
      else {      data.sort((a, b) => (a[value] > b[value] ? 1 : -1));        
    setIconSort(true)
    }
    setCount(count+1)
    setusers(data);
}
  return(
    <div className="datatable-container">
        <table className="datatable">
          <thead>
            <tr>
              <th>ID</th>
              <th >Email </th>
              <th onClick={()=>sort('first_name')}>First Name {iconSort?'^':'v'} </th>
              <th>Last Name</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td><img src={user.avatar} alt={user.first_name} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 )
}



