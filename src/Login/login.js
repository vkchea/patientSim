import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../Login/login.css';
import { Button } from '@mui/material';

export default function Login() {

  function createData(id, username, password, role) {
    return { id, username, password, role };
  }
  const LDAP = [
    createData("1", "mdegipto", "54321", "provider"),
    createData("2", "virathc", "12345", "trainee")
  ]

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  let navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    const token = {
      username,
      password,
      role
    }
    console.log(token);
    setToken(token);
    for (let i = 0; i < LDAP.length; i++) {
      console.log("token: " + token.username + " " + token.password);
      console.log("ldap: " + LDAP[i].username + " " + LDAP[i].password)
      if ((LDAP[i].username === token.username) && (LDAP[i].password === token.password)) {
        token.role = LDAP[i].role;
        navigate('/homePage', { state: token });
      }
    }
  }
    return (
      <div className="login-wrapper">
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <div>
            <Button id="loginButton" type="submit" variant="contained">Log In</Button>
          </div>
        </form>
      </div>
    )
  }

  Login.propTypes = {
    setToken: PropTypes.func
  }