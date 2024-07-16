import React, { useState } from 'react'
import { post } from '../../../utils/axios';
import { Navigate } from 'react-router-dom';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    if(localStorage.getItem('token') != null){
        return <Navigate to='/hello' />
      }
   
    const submit = (e:React.ChangeEvent<any>) => {
       
        let data = {
            username,
            password,
        };
        postCustomer(data);
    };
    const postCustomer = (data:any) => {
        
        let result = post('http://localhost:5000/api/login',data)
        result.then((data)=>{
            localStorage.setItem('token',data.token);
            console.log( localStorage.getItem('token'));
            return <Navigate to='/hello' />
        })
       
      };
    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    submit(e);
                }}
            >
                <label>
                    Username:
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit" value="Submit"  >Submit</button>
            </form>
        </div>
    )
}

export default Login;