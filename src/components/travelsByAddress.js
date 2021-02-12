import React, { useEffect, useState } from 'react';
import { useArr } from './context';

const RequestByAddress = ({myFunc}) => {
    const [address, setAddress] = useState("")

    const [arr, setArr] = useArr()

    useEffect(() => console.log(arr), [arr])
    
    return <div style={{display:"flex", flexDirection:"column"}}>
        <h2>Requests by Address</h2>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
        <input value={address}
            placeholder='Address'
         onChange={event => setAddress(event.target.value)}></input>

        <button style={{width:120}}onClick={() => {
                  myFunc(address)
                }}
        className='btn btn-block btn-primary'
        >Get Requests</button>
        </div>
    </div>
}

export default RequestByAddress;