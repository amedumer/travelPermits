import React from 'react';

function Details({id, data}) {
    const request = {
        'address': data[0],
        'travelId': id,
        'from': data[1],
        'to': data[2],
        'startTime': new Date(parseInt(data[3]) * "1000"),
        'endTime': new Date(parseInt(data[4]) * "1000"),
        'isApproved': data[5],
        'processTime': new Date(parseInt(data[6] * "1000"))
      }
      console.log("hello",request)
      return <div style={{display: 'flex', flexDirection:"column"}}>
          <br></br>
                <span>{request.travelId}</span>
                <span>{request.address}</span>
                <span>{request.from}</span>
                <span>{request.to}</span>
                <span>{JSON.stringify(request.startTime)}</span>
                <span>{JSON.stringify(request.endTime)}</span>
                <span>{JSON.stringify(request.isApproved)}</span>
      </div>
}

export default Details;