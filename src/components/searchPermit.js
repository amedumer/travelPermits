import React, { useState } from 'react';
import Details from './Details';

const SearchPermit = ({myFunc}) => {
    const [id, setId] = useState("")
    const [permit, setPermit] = useState();

    const handleClick = async () => setPermit(await myFunc(id))

    return <div className="column text-center" style={{display:"flex", flexDirection:"column"}}>
        <h1>Search Travel</h1>
        <div className="row content mr-auto ml-auto" style={{display:"flex", flexDirection:"column"}}>
        <input value={id}
            placeholder='Travel ID'
         onChange={event => setId(event.target.value)}></input>

        <button onClick={handleClick}
        className='btn btn-block btn-primary'
        >Search for travel</button>
        </div>
        <div style={{display: 'flex', flexDirection:"column"}}>
        {permit && <Details data={permit} id={id} />}
        </div>
    </div>
} 

export default SearchPermit;