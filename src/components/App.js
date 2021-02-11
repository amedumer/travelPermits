import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import travel from '../abis/travelPermit.json'
import RequestPermit from './requestPermit';
import Permission from './permissions';
import ApprovePermit from './approvePermit';
import RequestByAddress from './travelsByAddress'
import { useArr } from './context';
import SearchPermit from './searchPermit';
import Details from './Details';
import AdminPanel from './AdminPanel';



class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    const networkData = travel.networks[networkId]
    if(networkData) {

      const abi = travel.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })
      const travelCount = await contract.methods.balanceOf(this.state.account).call()
      this.setState({travelCount: parseInt(travelCount)})

      const adminState = await contract.methods.isAdmin(this.state.account).call()

      if (adminState) {
        this.setState({userRole:0})
      }
      else if (await contract.methods.isMaintainer(this.state.account).call()) {
        this.setState({userRole:1})
      }
      else{
        this.setState({userRole:2})
      }

      const newRequests = [];

      const trvCount = await contract.methods.userTravelCount(this.state.account).call()


      for (var i = 0; i < trvCount; i++) {
        console.log("\n")

        const trvIdx = await contract.methods.userTravelPermits(this.state.account,i).call()

        
        const trv = await contract.methods.travels(parseInt(trvIdx)).call()

        var tempTravel = {
          'address': trv[0],
          'travelId': parseInt(trvIdx),
          'from': trv[1],
          'to': trv[2],
          'startTime': new Date(parseInt(trv[3]) * "1000"),
          'endTime': new Date(parseInt(trv[4]) * "1000"),
          'isApproved': trv[5],
          'processTime': new Date(parseInt(trv[6] * "1000"))
        }

        newRequests.push(tempTravel);

      }
      this.setState(oldState => {return {...oldState, requests: newRequests}})
      console.log(this.state.requests)

    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      travelCount: 0,
      requests: [],
      userRole: 2,
      queryRequest:[]
    }
  }

  userState = () => {
    if (this.state.userRole == 0) {
      return "ADMIN"
    }
    else if (this.state.userRole == 1){
      return "MAINTAINER"
    }
    else{
      return "USER"
    }
  }
  
  travelRequest = (_addr, _from, _to, _start, _end) => {

    this.state.contract.methods.requestPermission(_addr, _from, _to, _start, _end).send({ from: this.state.account })
    alert("Request succesfully sent")

  }

  permitApproval = (id) => {
    this.state.contract.methods.approveTravel(id).send({ from: this.state.account })
    console.log("you are here")
  }

  setAdmin = (id) => {
    this.state.contract.methods.grantPermission(id,true,0).send({ from: this.state.account })
    alert("Admin priveleges given to address.")
  } 

  setMaintainer = (id) => {
    console.log(id)
    this.state.contract.methods.grantPermission(id,true,1).send({ from: this.state.account })
    alert("Maintainer priveleges given to address.")
  }

  getTravelsByAddress = async (addr) => {
    const newRequests = [];
    const trvCount = await this.state.contract.methods.userTravelCount(addr).call()


    for (var i = 0; i < trvCount; i++) {
      console.log("\n")

      const trvIdx = await this.state.contract.methods.userTravelPermits(addr,i).call()

      const trv = await this.state.contract.methods.travels(parseInt(trvIdx)).call()

      var tempTravel = {
        'address': trv[0],
        'travelId': parseInt(trvIdx),
        'from': trv[1],
        'to': trv[2],
        'startTime': new Date(parseInt(trv[3]) * "1000"),
        'endTime': new Date(parseInt(trv[4]) * "1000"),
        'isApproved': trv[5],
        'processTime': new Date(parseInt(trv[6] * "1000"))
      }

      newRequests.push(tempTravel);
      console.log(tempTravel)

    }
    //this.state.queryRequest(oldState => {return {...oldState, requests: newRequests}})   
    this.setState(oldState => {return {...oldState, queryRequest: newRequests}})
 
    console.log(this.state.queryRequest)
  }

  searchTravel = async (id) => await this.state.contract.methods.travels(id).call();



  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Travel Permit System
          </a>
          <small className="text-white"><span id="account">{this.userState()}</span></small>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <RequestPermit myFunc={(addr,from,to,start,end) => this.travelRequest(addr,from,to,start,end)}></RequestPermit>
                <br></br>
              </div>
              
            </main>
          </div>

          <div className="column text-center">
          <br></br>
            <h1 className = "content mr-auto ml-auto">Your Travel Permits</h1>
            { this.state.requests.map((request) => <><div style={{display: 'flex', flexDirection:"column"}}>
              <span>{request.travelId}</span>
              <span>{request.from}</span>
              <span>{request.to}</span>
              <span>{JSON.stringify(request.startTime)}</span>
              <span>{JSON.stringify(request.endTime)}</span>
              <span>{JSON.stringify(request.isApproved)}</span>
            </div>
            <br />
            </>)}
          </div>
          <div>

            <br></br>
            
          </div>
          
          { this.state.userRole == 0 &&
            <div>
            <AdminPanel 
            approve={a => this.permitApproval(a)} 
            setAdmin={b => this.setAdmin(b)} 
            setMaintain = {a => this.setMaintainer(a)}
            searchTrv = {c => this.searchTravel(c)}
            trvByAddr = {a => this.getTravelsByAddress(a)}

            ></AdminPanel>
            </div>}
            <br></br>
            { this.state.userRole == 0 &&
              <main role="main" className="row-lg-12 d-flex text-center">
              <div classname = 'column'>
            <h2>Travels by Address</h2>
            {this.state.queryRequest.map(request => <><div style={{display: 'flex', flexDirection:"column"}}>
              <span>{request.travelId}</span>
              <span>{request.from}</span>
              <span>{request.to}</span>
              <span>{JSON.stringify(request.startTime)}</span>
              <span>{JSON.stringify(request.endTime)}</span>
              <span>{JSON.stringify(request.isApproved)}</span>
              </div>
              <br />
              </>)}
            </div>


            
            </main>}
        </div>
      </div>
    );
  }
}

export default App;
