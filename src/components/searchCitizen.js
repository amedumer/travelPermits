import React, { useState } from 'react';
import Citizen from './Citizen';

const CitizenSearch = ({myFunc}) => {
    const [id, setId] = useState("")
    const [permit, setPermit] = useState();

    const handleClick = async () => setPermit(await myFunc(id))

    return <div className="column text-center" style={{display:"flex", flexDirection:"column"}}>
        <h2>Search Citizen</h2>
        <div className="row content mr-auto ml-auto" style={{display:"flex", flexDirection:"column"}}>
        <input value={id}
            placeholder='User Address'
         onChange={event => setId(event.target.value)}></input>

        <button onClick={handleClick}
        className='btn btn-block btn-primary'
        >Search</button>
        </div>
        <div style={{display: 'flex', flexDirection:"column"}}>
        {permit && <Citizen data={permit} />}
        </div>
    </div>
} 

export default CitizenSearch;