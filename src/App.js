import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

function App() {
  const [data,setData]=useState([])
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [mobile,setMob]=useState('')

  useEffect(()=>{
      getList()
  },[])

  function getList(){
      fetch("http://127.0.0.1:8000/api/data").then((result)=>{
      result.json().then((res)=>{
          setData(res)
          setName(res[0].name)
          setEmail(res[0].email)
          setMob(res[0].mobile)
      })
    })
  }

  function saveUser(){
    // console.log(name,email,mobile)
    let data={name,email,mobile}
    fetch("http://127.0.0.1:8000/api/addDataPost",{
      method:'POST',
      headers:{
      "Accept":"application/json",
      "Content-Type":"application/json",
    },
      body:JSON.stringify(data)
    }).then((result)=>{
      //console.log(result)
      getList()
    })
  }
  
  function delUser(id){
      //alert(id)
      fetch(`http://127.0.0.1:8000/api/deletePost/${id}`,{
      method:'DELETE',
      headers:{
          "Accept":"application/json",
          "Content-Type":"application/json",
    },
    body:JSON.stringify(data)
    }).then((result)=>{
      //console.log(result)
      getList()
    })
  }

  function selUser(id){
    fetch("http://127.0.0.1:8000/api/data").then((result)=>{
      result.json().then((res1)=>{
          setData(res1)
          setName(id.name)
          setEmail(id.email)
          setMob(id.mobile)
      })
    })
  }

  function UpdateUser(){

  }



  return (
    <div className="container">
      <div>
        <h1>Get API</h1>
        <br />
        <Table striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>E-mail</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.mobile}</td> 
                <td><Button variant="outline-danger" onClick={()=>delUser(item.id)}>Delete</Button> 
                  <Button variant="outline-warning" onClick={()=>selUser(item.id)}>Update</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className='d-flex justify-content-around mb-3'>
        <div>
          <h1>POST API</h1>
          <input type="text" name="name" onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
          <br />
          <br />
          <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
          <br />
          <br />
          <input type="text" name="mobile" onChange={(e) => setMob(e.target.value)} placeholder="Enter Mobile" />
          <br />
          <br />
          <Button variant="outline-primary" onClick={saveUser}> Save New User </Button>
        </div>
      <div>
          <h1>UPDATE API</h1>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter Name"
          />
          <br />
          <br />
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Enter Email"
          />
          <br />
          <br />
          <input
            type="text"
            name="mobile"
            value={mobile}
            placeholder="Enter Mobile"
          />
          <br />
          <br />
          <Button variant="outline-success" onClick={UpdateUser}>
            Update
          </Button>
        </div>
      </div>
    </div> 
  );
}

export default App;
