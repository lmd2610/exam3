import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { get } from 'src/utils/axios';
function Hello() {
    const [message, setMessage] = useState('')
    if (localStorage.getItem('token') === null) {
        return <Navigate to='/' />
    }
    function onClickHandle() {
        let result = get('http://localhost:5000/api/hello')
        result.then((data: any) => {
            setMessage(data.message);
        })
        return;

    }
    return (
        <>
            <button type="submit" value="Submit" onClick={onClickHandle}  >Submit</button>
            <p>{message}</p>
        </>
    )
}
export default Hello;