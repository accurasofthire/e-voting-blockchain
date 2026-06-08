// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Voting {
    uint id=1;

    struct Candidate {
        uint256 candidateId;
        string candidateUsername;
        string candidateFullName;
        string candidateParty;
        string candidatePosition;
        uint256 candidateAge;
        address candidateAddress;
        string candidateSymbol;
        string candidateElectionArea;
        uint256 votesReceived;
    }

    struct Voter {
        uint256 voterId;
        string voterUsername;
        string voterFirstName;
        string voterLastName;
        string voterEmail;
        string voterMobile;
        string voterLocation;
        // string voterProfile;
        // string voterPassword;
        address votingAddress;
        bool hasVoted;
    }
    struct Election {
        uint256 id;
        address organizerAddress;
        address[] allCandidateAddresses;
        address[] allVoterAddresses;
        address[] votedList;
        mapping(address => Candidate) candidates;
        mapping(address => bool) candidateExists;
        mapping(address => bool) voterExists;
        mapping(address => Voter) voters;
        bool electionStarted;
        bool electionEnded;
    }

    mapping(address => mapping(uint256 => Election)) public organizerElections;


    event electionStartEvent(string message);
    event electionEndEvent(string message);
    event candidateAddedEvent(address candidate,string message);
    event voterAddedEvent(address voter,string message);
    event voterVotedEvent(address voter,string message);
  


    modifier isElectionOrganizer(address _electionOrganizer) {
        _;
        require(msg.sender == _electionOrganizer, "Only organizer allowed");
    }

    modifier electionHasEnded(address _electionOrganizer ,uint _id){
        _;
        require(organizerElections[ _electionOrganizer][_id].electionEnded,"Election not Ended ");
    }

    function addOrganizer(address _organizer, uint256 _id) public {
        Election storage election = organizerElections[_organizer][_id];
        election.electionStarted = false;
        election.electionEnded = false;
    }

    function startVoting(address _organizer,uint _id) public isElectionOrganizer(_organizer){
        organizerElections[_organizer][_id].electionStarted=true;
        organizerElections[_organizer][_id].organizerAddress=_organizer;
        emit electionStartEvent("Election has now started");
    }
   
    function endVoting(address _organizer,uint _id) public isElectionOrganizer(_organizer) {
       organizerElections[_organizer][_id].electionStarted=false;
        organizerElections[_organizer][_id].electionEnded=true;
         emit electionEndEvent("Election has now ended");
    }
    
    function checkStatusOfElection(address _organizer,uint _id) external view returns(bool started, bool ended) {
                started= organizerElections[_organizer][_id].electionStarted;
                ended=   organizerElections[_organizer][_id].electionEnded;
                return (started,ended);
    }

    function setCandidate(
        string memory _username,
        string memory _fullName,
        string memory _party,
        string memory _position,
        uint256 _age,
        address _address,
        string memory _symbol,
        string memory _electionArea,
        address _organizer,
        uint256 _id
    ) public isElectionOrganizer(_organizer) {
        require(
            !organizerElections[_organizer][_id].candidateExists[_address],
            "Already candidate exists"
        );
        Candidate storage candidate = organizerElections[_organizer][_id]
            .candidates[_address];
        id=id+1;
        candidate.candidateId = id;
        candidate.candidateUsername = _username;
        candidate.candidateFullName = _fullName;
        candidate.candidateParty = _party;
        candidate.candidatePosition = _position;
        candidate.candidateAge = _age;
        candidate.candidateAddress = _address;
        candidate.candidateSymbol = _symbol;
        candidate.candidateElectionArea = _electionArea;
        organizerElections[_organizer][_id].allCandidateAddresses.push(
            _address
        );
        organizerElections[_organizer][_id].candidateExists[_address] = true;
        emit candidateAddedEvent(
            _address,
            "Candidate has been added successfully"
        );
    }

    function setVoter(
        string memory _username,
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _mobile, 
        string memory _location, 
        // string memory _profile, 
        address _address,
        address _organizer,
        uint256 _id
    ) public isElectionOrganizer(_organizer) {
        require(
            !organizerElections[_organizer][_id].voterExists[_address],
            "Already voter exists"
        );
        Voter storage voter = organizerElections[_organizer][_id]
            .voters[_address];
        id=id+1;
        voter.voterId = id;
        voter.voterUsername = _username;
        voter.voterFirstName = _firstName;
        voter.voterLastName = _lastName;
        voter.voterEmail = _email;
        voter.voterMobile = _mobile;
        voter.voterLocation = _location;
        // voter.voterProfile = _profile;
        voter.votingAddress = _address;
        organizerElections[_organizer][_id].allVoterAddresses.push(
            _address
        );
        organizerElections[_organizer][_id].voterExists[_address] = true;
        emit voterAddedEvent(
            _address,
            "Voter has been added successfully"
        );
    }

    function voteTo(address _candidateAddress ,address _organizer, address _voter,uint _id) public {
         require( organizerElections[_organizer][_id].electionStarted,"Election not started...! ");
        Voter storage voter= organizerElections[_organizer][_id].voters[_voter];
        require(!voter.hasVoted,"Already Voted");
        require(_voter!=_organizer,"Organizer can't vote");
        voter.votingAddress=_voter;
      organizerElections[_organizer][_id].candidates[_candidateAddress].votesReceived+=1;
        voter.hasVoted=true;
       organizerElections[_organizer][_id].votedList.push(_voter);
        emit voterVotedEvent(msg.sender,"Voter has voted");
    }

    function displayCandidateResults(address _organizer,uint _id, uint _index) public view  electionHasEnded(_organizer,_id) returns (string memory candidateFullName, string memory candidateParty, string memory candidatePosition, string memory candidateSymbol, string memory candidateElectionArea, address candidateAddress, uint votesReceived){
        address [] memory allCandidates=  organizerElections[_organizer][_id].allCandidateAddresses;  
        //  candidateUsername = organizerElections[_organizer][_id].candidates[allCandidates[_index]].candidateUsername;
         candidateFullName= organizerElections[_organizer][_id].candidates[allCandidates[_index]].candidateFullName;
         candidateParty=  organizerElections[_organizer][_id].candidates[allCandidates[_index]].candidateParty;
         candidatePosition= organizerElections[_organizer][_id].candidates[allCandidates[_index]].candidatePosition;
        //  candidateAge= organizerElections[_organizer][_id].candidates[allCandidates[_index]].candidateAge;
         candidateSymbol= organizerElections[_organizer][_id].candidates[allCandidates[_index]].candidateSymbol;
         candidateElectionArea= organizerElections[_organizer][_id].candidates[allCandidates[_index]].candidateElectionArea;
         candidateAddress=  organizerElections[_organizer][_id].candidates[allCandidates[_index]].candidateAddress;
         votesReceived= organizerElections[_organizer][_id].candidates[allCandidates[_index]].votesReceived;
        //  totalCandidates=allCandidates.length;
        return (candidateFullName,candidateParty,candidatePosition,candidateSymbol,candidateElectionArea,candidateAddress,votesReceived); 
    }
}
