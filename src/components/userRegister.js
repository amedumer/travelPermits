import React, { useState } from 'react';


const Register = ({myFunc}) => {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [id, setId] = useState("")


//address _addr, string memory from, string memory to, uint256 startTime,uint256 endTime)
    return <div style={{display:"flex", flexDirection:"column"}}>
        <h1>User Register</h1>
        <div style={{display:"flex", flexDirection:"column"}}>
        <input value={name}
            placeholder='Name'
         onChange={event => setName(event.target.value)}></input>

         <input value={surname}
            placeholder='Surname'
         onChange={event => setSurname(event.target.value)}></input>

        <input value={id}
            placeholder='Citizenship ID'
         onChange={event => setId(event.target.value)}></input>


        <button onClick={() => {
                  myFunc(name,surname,id)
                }}
        className='btn btn-block btn-primary'
        >Register</button>
        </div>
    </div>
}

export default Register;

// () => console.log(value)