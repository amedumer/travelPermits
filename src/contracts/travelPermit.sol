pragma solidity >=0.5.0 <=0.6.0;
pragma experimental ABIEncoderV2;

import "./ERC721Full.sol";

contract travelPermit is ERC721Full {
    uint travelCount = 0;

    struct Travel{
        address addr;
        string from;
        string to;
        uint256 startTime;
        uint256 endTime;
        bool isApproved;
        uint256 approveTime;
        uint256 id;
    }

    struct Person{
        string fName;
        string lName;
        uint256 citizenshipNumber;
        
    }
    
    modifier onlyAdmin(){
        require(isAdmin[msg.sender],"User is not authenticated to approve request!");
        _;
    }

    modifier onlyMaintainer(){
        require(isMaintainer[msg.sender]);
        _;
    }
    
    event travelRequest(address _addr,string origin, string to, uint start,uint end);
    event travelAccepted(uint travelId, address authorizationAddr);
    
    mapping(uint => Travel) public travels;
    
    mapping(address => uint[]) public userTravelPermits;
    mapping(address => uint) public userTravelCount;
    
    
    mapping(address => bool) public isAdmin;
    mapping(address => bool) public isMaintainer;
    
    constructor() ERC721Full("Travel", "TRVL") public{
        isAdmin[0xB6d5033ff68Ca514054AD8A85dF4Da2C4a631112] = true;
    }
    
    function requestPermission(address _addr, string memory from, string memory to, uint256 startTime,uint256 endTime) public{
        require( _addr == msg.sender || isApprovedForAll(_addr,msg.sender), "Given address is not approved!");
        require(startTime >= 0 && endTime >= 0, "Permit time must be bigger than zero!");
        require(startTime < endTime, "Dates are not consistent!");
        
        travels[travelCount] = Travel(_addr,from,to,startTime,endTime,false,0,travelCount);
        _mint(msg.sender,travelCount);
        userTravelPermits[_addr].push(travelCount);
        userTravelCount[_addr]++;
        
        travelCount++;
        emit travelRequest(_addr,from,to,startTime,endTime);
    }
    
    function guardianApproval(address _addr,bool approved) public {
        require(msg.sender != _addr);
        setApprovalForAll(_addr, approved);
    }
    
    function approveTravel(uint id) public onlyAdmin{
        travels[id].isApproved = true;
        travels[id].approveTime = block.timestamp;
        
        emit travelAccepted(id,msg.sender);
    }
    
    /*function userTravelExists(uint id, address _addr) private view returns(bool){
        for( uint i = 0 ; i < userTravelCount[_addr]; i++){
            if( userTravelPermits[_addr][i] == id){
                return true;
            }
        }
        return false;
    }*/
    
    function checkApproval(uint _id) public view returns(bool){
        require(_id <= travelCount, "Travel ID invalid.");
        require(isMaintainer[msg.sender] || travels[_id].addr == msg.sender, "User not authorized to check approval status");
        
        return travels[_id].isApproved;
    }
    
    function checkPermit(uint _id) public view returns(bool){
        require(_id <= travelCount, "Travel ID invalid.");
        require(isMaintainer[msg.sender] || travels[_id].addr == msg.sender, "User not authorized to check permit status");
        
        require(travels[_id].startTime <= block.timestamp && block.timestamp <= travels[_id].endTime, "Travel permit out of date!");
        
        return travels[_id].isApproved;
    }
    
    function permitInfo(uint _id) public view returns(Travel memory){
        require(_id <= travelCount, "Travel ID invalid.");
        require(isMaintainer[msg.sender] || travels[_id].addr == msg.sender || isAdmin[msg.sender], "User not authorized to view permit info" );
        return travels[userTravelPermits[msg.sender][_id]];
    }

    function returnTravelCount(address _addr) public view returns(uint){
        require (_addr == msg.sender, "Address is not valid");
        return userTravelCount[msg.sender];
    } 

    function grantPermission(address _addr, bool status, uint role) public onlyAdmin {
        if (role == 0) {
            isAdmin[_addr] = status;
        } else if (role == 1){
            isMaintainer[_addr] = status;
        }
        else{
            revert();
        }
    }

    function userRole() public view returns(uint){
        if (isAdmin[msg.sender]) {
            return 0;
        } else if (isMaintainer[msg.sender]){
            return 1;
        }
        else {
            return 2;
        }
    }

    function travelArray() public view returns(uint[] memory) {
        return userTravelPermits[msg.sender];
    }

    function userTravel(uint id) public view returns(Travel memory ){
        return travels[userTravelPermits[msg.sender][id]];
    }

}