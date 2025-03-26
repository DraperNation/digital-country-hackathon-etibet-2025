// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract TibetanDIDRegistry {
    mapping(address => string) private dids;

    event DIDRegistered(address indexed user, string did);

    function registerDID(string memory _did) public {
        require(bytes(dids[msg.sender]).length == 0, "DID already registered!");
        dids[msg.sender] = _did;
        emit DIDRegistered(msg.sender, _did);
    }

    function getDID(address user) public view returns (string memory) {
        return dids[user];
    }
}
