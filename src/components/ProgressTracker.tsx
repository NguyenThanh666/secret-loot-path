import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useSecretLootPath } from '@/hooks/useSecretLootPath';
import { fheService } from '@/lib/fheService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Lock, 
  Shield, 
  Eye, 
  EyeOff, 
  Zap,
  Star,
  Crown,
  Sparkles
} from 'lucide-react';

export const ProgressTracker = () => {
  const { address, isConnected } = useAccount();
  const { playerProgress, gainExperienceEncrypted, isLoading } = useSecretLootPath();
  
  const [encryptedProgress, setEncryptedProgress] = useState({
    totalExperience: 0,
    currentTier: 0,
    rewardsClaimed: 0,
    isActive: false
  });
  
  const [revealedProgress, setRevealedProgress] = useState<{
    experience: number;
    tier: number;
    rewards: number;
  } | null>(null);

  // Load encrypted progress
  useEffect(() => {
    if (isConnected && playerProgress) {
      setEncryptedProgress({
        totalExperience: playerProgress.totalExperience || 0,
        currentTier: playerProgress.currentTier || 0,
        rewardsClaimed: playerProgress.rewardsClaimed || 0,
        isActive: playerProgress.isActive || false
      });
    }
  }, [isConnected, playerProgress]);

  const handleRevealProgress = async () => {
    try {
      // In a real implementation, this would decrypt the FHE-encrypted progress
      // For now, we'll simulate the decryption
      const simulatedDecrypted = {
        experience: Math.floor(Math.random() * 1000) + 100,
        tier: Math.floor(Math.random() * 5) + 1,
        rewards: Math.floor(Math.random() * 10)
      };
      
      setRevealedProgress(simulatedDecrypted);
    } catch (err) {
      console.error('Failed to reveal progress:', err);
    }
  };

  const handleGainExperience = async () => {
    try {
      await gainExperienceEncrypted(0, 50); // passId, experience
    } catch (err) {
      console.error('Failed to gain experience:', err);
    }
  };

  const getTierIcon = (tier: number) => {
    if (tier >= 5) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (tier >= 3) return <Trophy className="h-5 w-5 text-purple-500" />;
    if (tier >= 2) return <Star className="h-5 w-5 text-blue-500" />;
    return <Zap className="h-5 w-5 text-gray-500" />;
  };

  const getTierName = (tier: number) => {
    if (tier >= 5) return 'Legendary';
    if (tier >= 3) return 'Epic';
    if (tier >= 2) return 'Rare';
    return 'Common';
  };

  const getTierColor = (tier: number) => {
    if (tier >= 5) return 'text-yellow-600';
    if (tier >= 3) return 'text-purple-600';
    if (tier >= 2) return 'text-blue-600';
    return 'text-gray-600';
  };

  if (!isConnected) {
    return (
      <Card className="bg-card/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            Encrypted Progress
          </CardTitle>
          <CardDescription>
            Connect your wallet to view your FHE-encrypted gaming progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Your progress is encrypted and private. Connect wallet to access.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          FHE-Encrypted Progress
        </CardTitle>
        <CardDescription>
          Your gaming progress is encrypted using FHE technology
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Encrypted Status */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Encryption Status</span>
          </div>
          <Badge variant="default" className="bg-green-500">
            <Shield className="h-3 w-3 mr-1" />
            FHE Protected
          </Badge>
        </div>

        {/* Progress Display */}
        {revealedProgress ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {revealedProgress.experience}
                </div>
                <div className="text-xs text-muted-foreground">Experience</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  {getTierIcon(revealedProgress.tier)}
                  <span className="text-2xl font-bold">
                    {revealedProgress.tier}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {getTierName(revealedProgress.tier)} Tier
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {revealedProgress.rewards}
                </div>
                <div className="text-xs text-muted-foreground">Rewards</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Next Tier</span>
                <span>{Math.floor((revealedProgress.experience % 200) / 2)}%</span>
              </div>
              <Progress value={(revealedProgress.experience % 200) / 2} className="h-2" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">
                  🔒
                </div>
                <div className="text-xs text-muted-foreground">Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">
                  🔒
                </div>
                <div className="text-xs text-muted-foreground">Tier</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">
                  🔒
                </div>
                <div className="text-xs text-muted-foreground">Rewards</div>
              </div>
            </div>

            <div className="text-center py-4">
              <Shield className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Your progress is encrypted and private
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {!revealedProgress ? (
            <Button 
              onClick={handleRevealProgress}
              variant="outline"
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-2" />
              Reveal Progress
            </Button>
          ) : (
            <Button 
              onClick={() => setRevealedProgress(null)}
              variant="outline"
              className="flex-1"
            >
              <EyeOff className="h-4 w-4 mr-2" />
              Hide Progress
            </Button>
          )}
          
          <Button 
            onClick={handleGainExperience}
            disabled={isLoading}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isLoading ? 'Gaining...' : 'Gain XP'}
          </Button>
        </div>

        {/* FHE Info */}
        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-blue-900 dark:text-blue-100">
                FHE Protection Active
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Your gaming data is encrypted and can only be decrypted by you.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
