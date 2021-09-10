// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Election {
    // Modal a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Store Candidate
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;

    // Store Candidate Count
    uint public candidatesCount;

    function setElection () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}