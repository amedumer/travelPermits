import React, { useState } from 'react';

const setPermissions = ({setAdmin,setMaintainer}) => {
    const [adminId, setAdminId] = useState("")
    const [maintainerId, setMaintainerId] = useState("")

    return <div style={{display:"flex", flexDirection:"column"}}>
        <h2>Give Permission</h2>
        <div style={{display:"flex", flexDirection:"row"}}>
        <div style={{display:"flex", flexDirection:"column"}}>
        <input value={adminId}
            placeholder='New Admin Address'
         onChange={event => setAdminId(event.target.value)}></input>

        <button onClick={() => {
                  setAdmin(adminId)
                }}
        className='btn btn-block btn-primary'
        >Set Admin</button>
        </div>
        <div style={{display:"flex", flexDirection:"column"}}>
         <input value={maintainerId}
            placeholder='New Maintainer Address'
         onChange={event => setMaintainerId(event.target.value)}></input>


        <button onClick={() => {
                  setMaintainer(maintainerId)
                }}
        className='btn btn-block btn-primary'
        >Set Maintainer</button>
        </div>
        </div>
    </div>
}

export default setPermissions;

// () => console.log(value)
