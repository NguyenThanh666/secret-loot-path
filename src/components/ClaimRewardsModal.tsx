import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useSecretLootPath } from '@/hooks/useSecretLootPath';
import { fheService } from '@/lib/fheService';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Loader2, 
  Gift, 
  Lock, 
  Trophy, 
  Sparkles, 
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ClaimRewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableRewards: {
    id: number;
    name: string;
    type: 'experience' | 'item' | 'currency' | 'nft';
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    isClaimed: boolean;
    encryptedData?: string;
  }[];
}

export const ClaimRewardsModal = ({ isOpen, onClose, availableRewards }: ClaimRewardsModalProps) => {
  const { address, isConnected } = useAccount();
  const { claimRewardEncrypted, isLoading, error } = useSecretLootPath();
  
  const [claimStep, setClaimStep] = useState<'select' | 'decrypting' | 'claiming' | 'success'>('select');
  const [selectedRewards, setSelectedRewards] = useState<number[]>([]);
  const [decryptedRewards, setDecryptedRewards] = useState<any[]>([]);
  const [revealedRewards, setRevealedRewards] = useState<number[]>([]);
  const [transactionHashes, setTransactionHashes] = useState<string[]>([]);

  const handleRewardSelection = (rewardId: number) => {
    setSelectedRewards(prev => 
      prev.includes(rewardId) 
        ? prev.filter(id => id !== rewardId)
        : [...prev, rewardId]
    );
  };

  const handleRevealReward = async (rewardId: number) => {
    try {
      const reward = availableRewards.find(r => r.id === rewardId);
      if (!reward?.encryptedData) return;

      // Decrypt the reward data
      const decrypted = await fheService.decrypt({
        encryptedValue: reward.encryptedData,
        publicKey: 'fhe_public_key_placeholder',
        timestamp: Date.now()
      });

      setDecryptedRewards(prev => [...prev, { id: rewardId, data: decrypted }]);
      setRevealedRewards(prev => [...prev, rewardId]);
    } catch (err) {
      console.error('Failed to decrypt reward:', err);
    }
  };

  const handleClaimRewards = async () => {
    if (!isConnected || selectedRewards.length === 0) return;

    try {
      setClaimStep('decrypting');
      
      // Step 1: Decrypt selected rewards
      const decryptionPromises = selectedRewards.map(async (rewardId) => {
        const reward = availableRewards.find(r => r.id === rewardId);
        if (reward?.encryptedData) {
          const decrypted = await fheService.decrypt({
            encryptedValue: reward.encryptedData,
            publicKey: 'fhe_public_key_placeholder',
            timestamp: Date.now()
          });
          return { id: rewardId, data: decrypted };
        }
        return null;
      });

      const decrypted = (await Promise.all(decryptionPromises)).filter(Boolean);
      setDecryptedRewards(decrypted);
      
      setClaimStep('claiming');
      
      // Step 2: Claim rewards on-chain
      const claimPromises = selectedRewards.map(rewardId => 
        claimRewardEncrypted(rewardId, 0) // rewardId, passId
      );
      
      const txHashes = await Promise.all(claimPromises);
      setTransactionHashes(txHashes);
      
      setClaimStep('success');
      
    } catch (err) {
      console.error('Claim failed:', err);
      setClaimStep('select');
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'experience': return <Trophy className="h-4 w-4" />;
      case 'item': return <Gift className="h-4 w-4" />;
      case 'currency': return <Sparkles className="h-4 w-4" />;
      case 'nft': return <Shield className="h-4 w-4" />;
      default: return <Gift className="h-4 w-4" />;
    }
  };

  const getRewardDisplayName = (reward: any) => {
    if (reward.isClaimed) return 'Claimed';
    if (revealedRewards.includes(reward.id)) {
      const decrypted = decryptedRewards.find(d => d.id === reward.id);
      return decrypted ? decrypted.data.name || reward.name : reward.name;
    }
    return 'Encrypted Reward';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-green-500" />
            Claim FHE-Encrypted Rewards
          </DialogTitle>
          <DialogDescription>
            Decrypt and claim your encrypted rewards using FHE technology.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* FHE Protection Info */}
          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900 dark:text-green-100">
                    FHE-Protected Rewards
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Your rewards are encrypted using FHE. You can choose to reveal 
                    them individually or keep them encrypted until you're ready to claim.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Rewards */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Available Rewards ({availableRewards.length})</h3>
            
            {claimStep === 'select' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableRewards.map((reward) => (
                  <Card 
                    key={reward.id} 
                    className={`cursor-pointer transition-all ${
                      selectedRewards.includes(reward.id) 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-muted/50'
                    } ${reward.isClaimed ? 'opacity-50' : ''}`}
                    onClick={() => !reward.isClaimed && handleRewardSelection(reward.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(reward.type)}
                          <CardTitle className="text-base">
                            {getRewardDisplayName(reward)}
                          </CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getRarityColor(reward.rarity)} text-white`}>
                            {reward.rarity}
                          </Badge>
                          {reward.isClaimed && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {reward.type.toUpperCase()}
                        </span>
                        {!reward.isClaimed && !revealedRewards.includes(reward.id) && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRevealReward(reward.id);
                            }}
                            className="h-8"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Reveal
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Decrypting Step */}
            {claimStep === 'decrypting' && (
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <div>
                  <h3 className="font-semibold">Decrypting Rewards</h3>
                  <p className="text-sm text-muted-foreground">
                    Using FHE to decrypt your selected rewards...
                  </p>
                  <Progress value={66} className="mt-4" />
                </div>
              </div>
            )}

            {/* Claiming Step */}
            {claimStep === 'claiming' && (
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <div>
                  <h3 className="font-semibold">Claiming Rewards</h3>
                  <p className="text-sm text-muted-foreground">
                    Processing your reward claims on-chain...
                  </p>
                  <Progress value={90} className="mt-4" />
                </div>
              </div>
            )}

            {/* Success Step */}
            {claimStep === 'success' && (
              <div className="text-center space-y-4">
                <div className="h-16 w-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-600">Rewards Claimed Successfully!</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedRewards.length} rewards have been claimed and added to your account.
                  </p>
                  {transactionHashes.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs text-muted-foreground">Transaction Hashes:</p>
                      {transactionHashes.map((hash, index) => (
                        <p key={index} className="text-xs font-mono text-muted-foreground">
                          {hash.slice(0, 10)}...{hash.slice(-8)}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <p className="text-destructive text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {claimStep === 'select' && (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleClaimRewards}
                disabled={!isConnected || selectedRewards.length === 0 || isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  `Claim ${selectedRewards.length} Reward${selectedRewards.length !== 1 ? 's' : ''}`
                )}
              </Button>
            </>
          )}
          
          {claimStep === 'success' && (
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
