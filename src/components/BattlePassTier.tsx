import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Eye, Trophy, Star, Zap } from "lucide-react";

interface BattlePassTierProps {
  tier: number;
  title: string;
  price: string;
  isRevealed: boolean;
  rewards: string[];
  rarity: "common" | "rare" | "epic" | "legendary";
}

const BattlePassTier = ({ tier, title, price, isRevealed, rewards, rarity }: BattlePassTierProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const rarityColors = {
    common: "text-gray-400",
    rare: "text-blue-400", 
    epic: "text-purple-400",
    legendary: "text-yellow-400"
  };

  const rarityIcons = {
    common: Star,
    rare: Zap,
    epic: Trophy,
    legendary: Trophy
  };

  const RarityIcon = rarityIcons[rarity];

  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 cursor-pointer gaming-border ${
        isRevealed ? 'bg-card' : 'mystery-box'
      } ${isHovered ? 'gaming-glow' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <RarityIcon className={`h-5 w-5 ${rarityColors[rarity]}`} />
            Tier {tier}
          </CardTitle>
          {!isRevealed && <Lock className="h-5 w-5 text-muted-foreground" />}
        </div>
        <p className="text-sm text-muted-foreground uppercase tracking-wide">{title}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {isRevealed ? (
          <div className="space-y-3">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-accent flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Revealed Rewards:
              </h4>
              <ul className="space-y-1">
                {rewards.map((reward, index) => (
                  <li key={index} className="text-sm text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {reward}
                  </li>
                ))}
              </ul>
            </div>
            <Button 
              variant="default" 
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              Claim Rewards
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-secondary neon-text">
                🔒 Encrypted Rewards
              </h4>
              <div className="space-y-1">
                {[...Array(3)].map((_, index) => (
                  <div 
                    key={index} 
                    className="h-4 bg-muted rounded animate-pulse mystery-box"
                  ></div>
                ))}
              </div>
            </div>
            <Button 
              variant="default" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gaming-glow font-semibold"
            >
              Purchase {price}
            </Button>
          </div>
        )}

        <div className="text-xs text-muted-foreground text-center">
          {isRevealed ? "Rewards revealed!" : "Reveal after purchase"}
        </div>
      </CardContent>

      {/* Mystery overlay effect */}
      {!isRevealed && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pointer-events-none"></div>
      )}
    </Card>
  );
};

export default BattlePassTier;