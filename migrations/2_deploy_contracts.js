const travel = artifacts.require("travelPermit");

module.exports = function(deployer) {
  deployer.deploy(travel);
};
