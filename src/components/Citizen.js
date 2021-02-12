import React from 'react';

function Citizen({data}) {
    const request = {
        'name': data[0],
        'surname': data[1],
        'id': data[2]
      }
      console.log("hello",request)
      return <div style={{display: 'flex', flexDirection:"column"}}>
          <br></br>
                <span>{request.name}</span>
                <span>{request.surname}</span>
                <span>{request.id}</span>
      </div>
}

export default Citizen;