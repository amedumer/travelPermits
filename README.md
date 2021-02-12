# travelPermits
Decentralized covid19 Travel Permission app made with Solidity &amp; React.js. Made in Tübitak Bilgem Blockchain Research Lab

- This dApp uses Ropsten Test Network.

# How to use
- Run ```sudo npm install```
- Change the initial admin's address in the /src/contracts/travelPermit.sol. (Most preferably your address in Metamask)
- Run ```sudo truffle migrate```, this will migrate the contract to Ropsten Network.
- After succesfull migration, copy Transaction hash and Contract address of travelPermit.sol and store it somewhere. You might use it somewhere else
- Run ```sudo npm run build``` and ```sudo npm run start```


# Things to note
- Every mapping and data is public in the contract file, I had no time to fix bugs. Take it or leave it buddy, I personally thank god since it works
- Maintainer role doesn't do anything at the moment, might add something later.
- There are bugs, A LOT OF THEM. If you spot any of them just say hello and move on with your life.

## Special Thanks
@aliparlakci, a.k.a React.js god himself
