import BattlePassTier from "./BattlePassTier";
import { ProgressTracker } from "./ProgressTracker";
import seasonalBackground from "@/assets/seasonal-background.jpg";
import { useSecretLootPath } from "@/hooks/useSecretLootPath";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const { 
    battlePassInfo, 
    playerProgress, 
    createNewBattlePass, 
    gainExperienceEncrypted,
    isLoading,
    error 
  } = useSecretLootPath();
  
  const [playerStats, setPlayerStats] = useState({
    totalExperience: 0,
    currentTier: 0,
    rewardsClaimed: 0,
    isActive: false
  });

  // Load player progress when connected
  useEffect(() => {
    if (isConnected && playerProgress) {
      setPlayerStats({
        totalExperience: playerProgress.totalExperience || 0,
        currentTier: playerProgress.currentTier || 0,
        rewardsClaimed: playerProgress.rewardsClaimed || 0,
        isActive: playerProgress.isActive || false
      });
    }
  }, [isConnected, playerProgress]);
  const battlePassTiers = [
    {
      tier: 1,
      title: "Starter Pack",
      price: "0.1 ETH",
      isRevealed: true,
      rewards: ["Digital Avatar", "Basic Emote Pack", "100 XP Boost"],
      rarity: "common" as const
    },
    {
      tier: 2,
      title: "Explorer Bundle",
      price: "0.25 ETH", 
      isRevealed: false,
      rewards: ["Rare Weapon Skin", "Custom Banner", "250 XP Boost", "Mystery Box"],
      rarity: "rare" as const
    },
    {
      tier: 3,
      title: "Warrior Collection",
      price: "0.5 ETH",
      isRevealed: false,
      rewards: ["Epic Character Skin", "Legendary Emote", "500 XP Boost", "Exclusive Title"],
      rarity: "epic" as const
    },
    {
      tier: 4,
      title: "Champion's Vault", 
      price: "1.0 ETH",
      isRevealed: false,
      rewards: ["Mythic Weapon", "Animated Avatar", "1000 XP Boost", "VIP Access", "Rare NFT"],
      rarity: "legendary" as const
    },
    {
      tier: 5,
      title: "Ultimate Mystery",
      price: "2.5 ETH",
      isRevealed: false,
      rewards: ["???", "???", "???", "???", "???"],
      rarity: "legendary" as const
    },
    {
      tier: 6,
      title: "Season Finale",
      price: "5.0 ETH",
      isRevealed: false,
      rewards: ["???", "???", "???", "???", "???", "???"],
      rarity: "legendary" as const
    }
  ];

  return (
    <main className="relative min-h-screen">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${seasonalBackground})` }}
      ></div>
      <div className="absolute inset-0 battle-gradient opacity-90"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Dashboard Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground neon-text mb-4">
            Season 1: Cyber Awakening
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Discover FHE-encrypted rewards hidden within each battle pass tier
          </p>
          
          {/* Player Stats (if connected) */}
          {isConnected && (
            <div className="mb-8">
              <Card className="bg-card/50 backdrop-blur-lg border-border">
                <CardHeader>
                  <CardTitle className="text-center">Your Encrypted Progress</CardTitle>
                  <CardDescription className="text-center">
                    All data is encrypted using FHE technology
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary neon-text">
                        {playerStats.totalExperience}
                      </div>
                      <div className="text-sm text-muted-foreground">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary neon-text">
                        {playerStats.currentTier}
                      </div>
                      <div className="text-sm text-muted-foreground">Current Tier</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent neon-text">
                        {playerStats.rewardsClaimed}
                      </div>
                      <div className="text-sm text-muted-foreground">Rewards Claimed</div>
                    </div>
                    <div className="text-center">
                      <Badge variant={playerStats.isActive ? "default" : "secondary"}>
                        {playerStats.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Global Stats */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary neon-text">156</div>
              <div className="text-sm text-muted-foreground">Players Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary neon-text">1,234</div>
              <div className="text-sm text-muted-foreground">Rewards Claimed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent neon-text">89%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>

                {/* Progress Tracker */}
                <div className="mb-8">
                  <ProgressTracker />
                </div>

                {/* Battle Pass Tiers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {battlePassTiers.map((tier) => (
                    <BattlePassTier
                      key={tier.tier}
                      tier={tier.tier}
                      title={tier.title}
                      price={tier.price}
                      isRevealed={tier.isRevealed}
                      rewards={tier.rewards}
                      rarity={tier.rarity}
                    />
                  ))}
                </div>

        {/* Call to Action */}
        <div className="text-center bg-card/50 backdrop-blur-lg rounded-lg p-8 gaming-border">
          <h3 className="text-2xl font-bold text-foreground mb-4 neon-text">
            Ready to Unlock FHE-Encrypted Rewards?
          </h3>
          <p className="text-muted-foreground mb-6">
            Connect your wallet and start purchasing encrypted battle pass tiers. 
            All your gaming data is encrypted using FHE technology, ensuring complete privacy.
          </p>
          
          {/* FHE Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-background/50 rounded-lg p-4">
              <div className="text-lg font-semibold text-primary mb-2">🔒 FHE Encryption</div>
              <div className="text-sm text-muted-foreground">Your data stays private</div>
            </div>
            <div className="bg-background/50 rounded-lg p-4">
              <div className="text-lg font-semibold text-secondary mb-2">🎮 Zero-Knowledge Gaming</div>
              <div className="text-sm text-muted-foreground">Play without revealing progress</div>
            </div>
            <div className="bg-background/50 rounded-lg p-4">
              <div className="text-lg font-semibold text-accent mb-2">🏆 Encrypted Rewards</div>
              <div className="text-sm text-muted-foreground">Rewards hidden until claimed</div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            {isConnected ? (
              <>
                <Button 
                  onClick={() => gainExperienceEncrypted(0, 100)}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold gaming-glow transition-all duration-300"
                >
                  {isLoading ? "Encrypting..." : "Gain Experience (FHE)"}
                </Button>
                <Button 
                  variant="outline"
                  className="border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  View Encrypted Progress
                </Button>
              </>
            ) : (
              <>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold gaming-glow transition-all duration-300">
                  Connect Wallet to Start
                </Button>
                <Button 
                  variant="outline"
                  className="border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Learn About FHE
                </Button>
              </>
            )}
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;