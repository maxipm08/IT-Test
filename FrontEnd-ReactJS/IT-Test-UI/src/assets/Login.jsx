import React, { useState, useEffect } from 'react'
import '../style.css'
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usenavigate = useNavigate();

  const ProceedLoginAPI = async (e) => {
    e.preventDefault();
    if (validate()) {
      if(await Authenticate()) {
        usenavigate('/BeerList')
      }
    }
  }

  const Authenticate = async () => {
    try {
      let result = true;
      let userLogin = {"Username": username, "Password": password};

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(userLogin)
      };

      const response = await fetch('https://localhost:7251/api/login', requestOptions)
      const data = await response.text();

      if (!response.ok) {
        throw new Error(data);
      }

      localStorage.setItem('jwtToken', data);
      return result;
    } catch(error) {
      let msg = '';
      if(error.message == 'Failed to fetch') {
        msg = 'Connection Error. Verify Please'
      } else {
        msg = error.message
      }

      Swal.fire({
        icon: 'error',
        text: msg
      })
      return false;
    }
  }

  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
        Swal.fire({
          icon: 'error',
          text: 'Please Enter Username'
        })
        result = false;
        return result;
    }
    if (password === '' || password === null) {
        
        Swal.fire({
          icon: 'error',
          text: 'Please Enter Password'
        })
        result = false;
        return result;
    }
    return result;
  }

  useEffect(()=>{
    localStorage.clear();
  }, []);

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 bg-primary'>
      <div className='form_container p-5 rounded bg-white'>
        <form onSubmit={ProceedLoginAPI}>
          <h3 className='text-center'>Sign In</h3>
          <div className='mb-2'>
            <label htmlFor="Username">Username</label>
            <input type="text" placeholder='Enter Username' className='form-control' value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label htmlFor="Password">Password</label>
            <input type="password" placeholder='Enter Password' className='form-control' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className='mb-4'>
          </div>
          <div className='d-grid'>
            <button type='submit' className='btn btn-primary'>Sign In</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login