import BattlePassTier from "./BattlePassTier";
import seasonalBackground from "@/assets/seasonal-background.jpg";

const Dashboard = () => {
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
            Discover encrypted rewards hidden within each battle pass tier
          </p>
          
          {/* Stats */}
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
            Ready to Unlock the Mystery?
          </h3>
          <p className="text-muted-foreground mb-6">
            Connect your wallet and start purchasing encrypted battle pass tiers. 
            Each purchase reveals exclusive rewards that remain hidden until claimed.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold gaming-glow transition-all duration-300">
              Get Started
            </button>
            <button className="border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;