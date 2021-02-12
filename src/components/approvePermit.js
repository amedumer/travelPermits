import React, { useState } from 'react';

const approvePermit = ({permitApproval}) => {
    const [id, setId] = useState("")

    return <div style={{display:"flex", flexDirection:"column"}}>
        <h2>Approve Permit Request</h2>
        <div style={{display:"flex", flexDirection:"column"}}>
        <input value={id}
            placeholder='Travel Id'
         onChange={event => setId(event.target.value)}></input>

        <button onClick={() => {
                  permitApproval(id)
                }}
        className='btn btn-block btn-primary'
        >Approve Request</button>
        </div>
    </div>




// () => console.log(value)
}

export default approvePermit;