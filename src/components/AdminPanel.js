import React, { useState } from 'react';
import ApprovePermit from './approvePermit';
import Permission from './permissions';
import SearchPermit from './searchPermit';
import RequestByAddress from './travelsByAddress';
import CitizenInfo from './searchCitizen'
import CitizenSearch from './searchCitizen';


const AdminPanel = ({approve, setAdmin,setMaintain,searchTrv, trvByAddr,searchCit}) => {
    return<div className="column">
    <main role="main" className="col-lg-12 d-flex text-center">
    <div className="row content mr-auto ml-auto">
        <ApprovePermit permitApproval={(id) => approve(id)} > </ApprovePermit>
        <br></br>
        </div>
    <div className="row content mr-auto ml-auto">
        <Permission setAdmin={a => setAdmin(a)} setMaintain={b => setMaintain(b)} ></Permission>
        <br></br>
        </div>
    <div className="row content mr-auto ml-auto">
        <SearchPermit myFunc = {async (id) => await searchTrv(id)}></SearchPermit>
        <br></br>
        </div>
    <div className="row content mr-auto ml-auto">
        <RequestByAddress myFunc = {async (id) => await trvByAddr(id)}></RequestByAddress>
        <br></br>
        </div>
    <div className="row content mr-auto ml-auto">
        <CitizenSearch myFunc = {async (addr) => await searchCit(addr)}></CitizenSearch>
        <br></br>
        </div>

    
        </main>
  </div>

}

export default AdminPanel;

/*
0x883f661a4450B3D5bd52D46f33C4d80064dCAf25
<SearchPermit myFunc = {async (id) => await this.searchTravel(id)}></SearchPermit>


          <div className="column">
            <main role="main" className="col-lg-12 d-flex text-center">
            <div className="row content mr-auto ml-auto">
                <ApprovePermit myFunc={(id) => this.permitApproval(id)} > </ApprovePermit>
                <br></br>
                </div>
            <div className="row content mr-auto ml-auto">
                <Permission setAdmin={a => this.setAdmin(a)} setMaintainer={b => this.setMaintainer(b)} ></Permission>
                <br></br>
                </div>
                </main>
          </div>
*/