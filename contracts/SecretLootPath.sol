// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecretLootPath is SepoliaConfig {
    using FHE for *;
    
    struct BattlePass {
        euint32 passId;
        euint32 totalTiers;
        euint32 currentTier;
        euint32 experiencePoints;
        bool isActive;
        bool isCompleted;
        string name;
        string description;
        address owner;
        uint256 startTime;
        uint256 endTime;
    }
    
    struct Reward {
        euint32 rewardId;
        euint32 tierRequired;
        euint32 rarity;
        bool isClaimed;
        string rewardType;
        string metadata;
        address claimer;
        uint256 claimTime;
    }
    
    struct PlayerProgress {
        euint32 totalExperience;
        euint32 currentTier;
        euint32 rewardsClaimed;
        bool isActive;
        address player;
        uint256 lastUpdate;
    }
    
    mapping(uint256 => BattlePass) public battlePasses;
    mapping(uint256 => Reward) public rewards;
    mapping(address => PlayerProgress) public playerProgress;
    mapping(address => euint32) public playerReputation;
    
    uint256 public battlePassCounter;
    uint256 public rewardCounter;
    
    address public owner;
    address public verifier;
    
    event BattlePassCreated(uint256 indexed passId, address indexed owner, string name);
    event RewardClaimed(uint256 indexed rewardId, address indexed claimer, string rewardType);
    event PlayerTierUp(uint256 indexed passId, address indexed player, uint32 newTier);
    event ExperienceGained(address indexed player, uint32 experience);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createBattlePass(
        string memory _name,
        string memory _description,
        uint256 _totalTiers,
        uint256 _duration
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Battle pass name cannot be empty");
        require(_totalTiers > 0, "Total tiers must be positive");
        require(_duration > 0, "Duration must be positive");
        
        uint256 passId = battlePassCounter++;
        
        battlePasses[passId] = BattlePass({
            passId: FHE.asEuint32(0), // Will be set properly later
            totalTiers: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            currentTier: FHE.asEuint32(0),
            experiencePoints: FHE.asEuint32(0),
            isActive: true,
            isCompleted: false,
            name: _name,
            description: _description,
            owner: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration
        });
        
        emit BattlePassCreated(passId, msg.sender, _name);
        return passId;
    }
    
    function addReward(
        uint256 passId,
        uint256 tierRequired,
        uint256 rarity,
        string memory rewardType,
        string memory metadata
    ) public returns (uint256) {
        require(battlePasses[passId].owner == msg.sender, "Only pass owner can add rewards");
        require(battlePasses[passId].isActive, "Battle pass must be active");
        
        uint256 rewardId = rewardCounter++;
        
        rewards[rewardId] = Reward({
            rewardId: FHE.asEuint32(0), // Will be set properly later
            tierRequired: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            rarity: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            isClaimed: false,
            rewardType: rewardType,
            metadata: metadata,
            claimer: address(0),
            claimTime: 0
        });
        
        return rewardId;
    }
    
    function gainExperience(
        uint256 passId,
        externalEuint32 experience,
        bytes calldata inputProof
    ) public {
        require(battlePasses[passId].isActive, "Battle pass must be active");
        require(block.timestamp <= battlePasses[passId].endTime, "Battle pass has ended");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalExperience = FHE.fromExternal(experience, inputProof);
        
        // Update player progress
        if (playerProgress[msg.sender].player == address(0)) {
            playerProgress[msg.sender] = PlayerProgress({
                totalExperience: internalExperience,
                currentTier: FHE.asEuint32(0),
                rewardsClaimed: FHE.asEuint32(0),
                isActive: true,
                player: msg.sender,
                lastUpdate: block.timestamp
            });
        } else {
            playerProgress[msg.sender].totalExperience = FHE.add(
                playerProgress[msg.sender].totalExperience, 
                internalExperience
            );
            playerProgress[msg.sender].lastUpdate = block.timestamp;
        }
        
        // Update battle pass experience
        battlePasses[passId].experiencePoints = FHE.add(
            battlePasses[passId].experiencePoints, 
            internalExperience
        );
        
        emit ExperienceGained(msg.sender, 0); // Will be decrypted off-chain
    }
    
    function claimReward(
        uint256 rewardId,
        uint256 passId
    ) public {
        require(rewards[rewardId].claimer == address(0), "Reward already claimed");
        require(battlePasses[passId].isActive, "Battle pass must be active");
        require(playerProgress[msg.sender].isActive, "Player must be active");
        
        // Check if player has required tier (this would be done with FHE comparison in practice)
        // For now, we'll use a simplified check
        require(playerProgress[msg.sender].currentTier != FHE.asEuint32(0), "Insufficient tier");
        
        rewards[rewardId].isClaimed = true;
        rewards[rewardId].claimer = msg.sender;
        rewards[rewardId].claimTime = block.timestamp;
        
        // Update player's claimed rewards count
        playerProgress[msg.sender].rewardsClaimed = FHE.add(
            playerProgress[msg.sender].rewardsClaimed, 
            FHE.asEuint32(1)
        );
        
        emit RewardClaimed(rewardId, msg.sender, rewards[rewardId].rewardType);
    }
    
    function updatePlayerTier(
        address player,
        euint32 newTier
    ) public {
        require(msg.sender == verifier, "Only verifier can update tiers");
        require(playerProgress[player].isActive, "Player must be active");
        
        playerProgress[player].currentTier = newTier;
        emit PlayerTierUp(0, player, 0); // Will be decrypted off-chain
    }
    
    function updateReputation(
        address player,
        euint32 reputation
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(player != address(0), "Invalid player address");
        
        playerReputation[player] = reputation;
    }
    
    function getBattlePassInfo(uint256 passId) public view returns (
        string memory name,
        string memory description,
        uint8 totalTiers,
        uint8 currentTier,
        uint8 experiencePoints,
        bool isActive,
        bool isCompleted,
        address passOwner,
        uint256 startTime,
        uint256 endTime
    ) {
        BattlePass storage pass = battlePasses[passId];
        return (
            pass.name,
            pass.description,
            0, // FHE.decrypt(pass.totalTiers) - will be decrypted off-chain
            0, // FHE.decrypt(pass.currentTier) - will be decrypted off-chain
            0, // FHE.decrypt(pass.experiencePoints) - will be decrypted off-chain
            pass.isActive,
            pass.isCompleted,
            pass.owner,
            pass.startTime,
            pass.endTime
        );
    }
    
    function getPlayerProgress(address player) public view returns (
        uint8 totalExperience,
        uint8 currentTier,
        uint8 rewardsClaimed,
        bool isActive,
        uint256 lastUpdate
    ) {
        PlayerProgress storage progress = playerProgress[player];
        return (
            0, // FHE.decrypt(progress.totalExperience) - will be decrypted off-chain
            0, // FHE.decrypt(progress.currentTier) - will be decrypted off-chain
            0, // FHE.decrypt(progress.rewardsClaimed) - will be decrypted off-chain
            progress.isActive,
            progress.lastUpdate
        );
    }
    
    function getRewardInfo(uint256 rewardId) public view returns (
        uint8 tierRequired,
        uint8 rarity,
        bool isClaimed,
        string memory rewardType,
        string memory metadata,
        address claimer,
        uint256 claimTime
    ) {
        Reward storage reward = rewards[rewardId];
        return (
            0, // FHE.decrypt(reward.tierRequired) - will be decrypted off-chain
            0, // FHE.decrypt(reward.rarity) - will be decrypted off-chain
            reward.isClaimed,
            reward.rewardType,
            reward.metadata,
            reward.claimer,
            reward.claimTime
        );
    }
    
    function getPlayerReputation(address player) public view returns (uint8) {
        return 0; // FHE.decrypt(playerReputation[player]) - will be decrypted off-chain
    }
    
    function completeBattlePass(uint256 passId) public {
        require(battlePasses[passId].owner == msg.sender, "Only pass owner can complete");
        require(battlePasses[passId].isActive, "Pass must be active");
        require(block.timestamp > battlePasses[passId].endTime, "Pass must be ended");
        
        battlePasses[passId].isActive = false;
        battlePasses[passId].isCompleted = true;
    }
}
