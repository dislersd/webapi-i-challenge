import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const url = "http://localhost:3000/users"
const App = () => {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");

  useEffect(() => {
    console.log('use effect fired')
    const fetchData = async () => { 
      try {
        const res = await axios.get(url)
        setUsers(res.data)
      } catch (err) {
        console.log(`Error: ${err.message}`)
      }
 
    }
    fetchData()
    console.log(users, 'Users in useeffect')
  }, []);
  
  console.log(users, 'Users in function body')

  const deleteUser = (e, id) => {
    e.preventDefault();
    axios.delete(`http://localhost:3000/users/${id}`);
  };

  const handleNameChange = e => {
    setUserName(e.target.value);
  };

  const handleBioChange = e => {
    setUserBio(e.target.value);
  };

  return (
    <div className="App">
      {users.length === 0 ? (
        <div> Loading... </div>
      ) : (
        users.map(user => (
          <div key={user.id}>
            <div>
              <p>{user.name}</p>
              <p>{user.bio}</p>
              <button onClick={e => deleteUser(e, user.id)}> x </button>
            </div>
            <hr />
          </div>
        ))
      )}

      <form>
        <input
          type="text"
          name="name"
          value={userName}
          onChange={handleNameChange}
          placeholder="username..."
        />
        <input
          type="text"
          name="bio"
          value={userBio}
          onChange={handleBioChange}
          placeholder="user bio..."
        />
        <button> add user </button>
      </form>
    </div>
  );
};

export default App;
