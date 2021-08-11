import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMob] = useState("");

  useEffect(() => {
    getList();
  });

  function getList() {
    fetch("http://127.0.0.1:8000/api/data").then((result) => {
      result.json().then((res) => {
        setData(res);
        setName(res[0].name);
        setEmail(res[0].email);
        setMob(res[0].mobile);
      });
    });
  }

  function UpdateUser(id) {
    let data = {name, email, mobile,id};
    fetch(`http://127.0.0.1:8000/api/data/${id}`,{
      method: "PUT",
      headers: {
        Accept: "application-json",
        "Content-type": "application-json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
        getList();
      });
    });
  }

  function DelUser(id) {
    fetch(`http://127.0.0.1:8000/api/data/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
        getList();
      });
    });
  }

  function selUser(id) {
    let item = data[id - 1];
    setName(item.name);
    setEmail(item.email);
    setMob(item.mobile);
  }

  function saveUser() {
    let data = { name, email, mobile };

    fetch("http://127.0.0.1:8000/api/data", {
      method: "POST",
      headers: {
        Accept: "application-json",
        "Content-type": "application-json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
        getList();
      });
    });
  }

  return (
    <div className="container d-flex justify-content-space-between">
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
                <td>{i + 1}</td>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.mobile}</td>
                <td>
                  <Button variant="outline-danger" onClick={DelUser(item.id)}>
                    Delete
                  </Button>
                  <Button variant="outline-warning" onClick={selUser(item.id)}>
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div>
        <h1>POST/DEL API</h1>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
        <br />
        <br />
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <br />
        <br />
        <input
          type="text"
          name="mobile"
          onChange={(e) => setMob(e.target.value)}
          placeholder="Enter Mobile"
        />
        <br />
        <br />
        <Button variant="outline-primary" onClick={saveUser}>
          Save New User
        </Button>
      </div>

      <div>
        <h1>UPDATE API</h1>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
        <br />
        <br />
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <br />
        <br />
        <input
          type="text"
          name="mobile"
          value={mobile}
          onChange={(e) => setMob(e.target.value)}
          placeholder="Enter Mobile"
        />
        <br />
        <br />
        <Button variant="outline-success" onClick={UpdateUser}>
          Update
        </Button>
      </div>
    </div>
  );
}

export default App;
