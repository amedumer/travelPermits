import React, { useState } from 'react';


const RequestPermit = ({myFunc}) => {
    const [address, setAdress] = useState("")
    const [from, setValue] = useState("")
    const [to, setTo] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

//address _addr, string memory from, string memory to, uint256 startTime,uint256 endTime)
    return <div style={{display:"flex", flexDirection:"column"}}>
        <h1>Request Permit</h1>
        <div style={{display:"flex", flexDirection:"row"}}>
        <input value={address}
            placeholder='Address'
         onChange={event => setAdress(event.target.value)}></input>

         <input value={from}
            placeholder='From'
         onChange={event => setValue(event.target.value)}></input>

        <input value={to}
            placeholder='To'
         onChange={event => setTo(event.target.value)}></input>

        <input value={startTime}
            placeholder='Start Time'
         onChange={event => setStartTime(event.target.value)}></input>

        <input value={endTime}    
            placeholder='End Time'
         onChange={event => setEndTime(event.target.value)}></input>

        <button onClick={() => {
                  myFunc(address,from,to,startTime,endTime)
                }}
        className='btn btn-block btn-primary'
        >Send Request</button>
        </div>
    </div>
}

export default RequestPermit;

// () => console.log(value)