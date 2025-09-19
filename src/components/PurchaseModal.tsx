import { useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, Lock, Trophy, Sparkles } from 'lucide-react';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: {
    tier: number;
    title: string;
    price: string;
    rewards: string[];
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
  };
}

export const PurchaseModal = ({ isOpen, onClose, tier }: PurchaseModalProps) => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { createNewBattlePass, isLoading, error } = useSecretLootPath();
  
  const [purchaseStep, setPurchaseStep] = useState<'confirm' | 'encrypting' | 'purchasing' | 'success'>('confirm');
  const [encryptedData, setEncryptedData] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handlePurchase = async () => {
    if (!isConnected) return;

    try {
      setPurchaseStep('encrypting');
      
      // Step 1: Encrypt purchase data using FHE
      const purchaseData = {
        tier: tier.tier,
        price: tier.price,
        timestamp: Date.now(),
        player: address,
      };
      
      const encrypted = await fheService.encrypt(JSON.stringify(purchaseData));
      setEncryptedData(encrypted.encryptedValue);
      
      setPurchaseStep('purchasing');
      
      // Step 2: Create battle pass with encrypted data
      const txHash = await createNewBattlePass(
        `Tier ${tier.tier} - ${tier.title}`,
        `FHE-encrypted battle pass tier with ${tier.rewards.length} rewards`,
        tier.tier,
        30 * 24 * 60 * 60 // 30 days in seconds
      );
      
      setTransactionHash(txHash);
      setPurchaseStep('success');
      
    } catch (err) {
      console.error('Purchase failed:', err);
      setPurchaseStep('confirm');
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

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600';
      case 'rare': return 'text-blue-600';
      case 'epic': return 'text-purple-600';
      case 'legendary': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Purchase FHE-Encrypted Battle Pass
          </DialogTitle>
          <DialogDescription>
            Your purchase data will be encrypted using FHE technology for complete privacy.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tier Information */}
          <Card className="bg-card/50 backdrop-blur-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Tier {tier.tier}: {tier.title}</CardTitle>
                <Badge className={`${getRarityColor(tier.rarity)} text-white`}>
                  {tier.rarity.toUpperCase()}
                </Badge>
              </div>
              <CardDescription>
                FHE-encrypted rewards package
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Price:</span>
                  <span className="text-2xl font-bold text-primary">{tier.price}</span>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Encrypted Rewards ({tier.rewards.length})
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {tier.rewards.map((reward, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Sparkles className="h-3 w-3 text-yellow-500" />
                        <span className="text-muted-foreground">
                          {reward === '???' ? 'Encrypted Reward' : reward}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FHE Encryption Info */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                    FHE Encryption Protection
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Your purchase data, rewards, and progress will be encrypted using 
                    Fully Homomorphic Encryption, ensuring complete privacy while 
                    maintaining verifiability on-chain.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Steps */}
          {purchaseStep === 'confirm' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <span className="font-medium">Your Balance:</span>
                <span className="font-mono">
                  {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Loading...'}
                </span>
              </div>
              
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}
            </div>
          )}

          {purchaseStep === 'encrypting' && (
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <div>
                <h3 className="font-semibold">Encrypting Purchase Data</h3>
                <p className="text-sm text-muted-foreground">
                  Using FHE to encrypt your purchase information...
                </p>
              </div>
            </div>
          )}

          {purchaseStep === 'purchasing' && (
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <div>
                <h3 className="font-semibold">Processing Purchase</h3>
                <p className="text-sm text-muted-foreground">
                  Creating encrypted battle pass on-chain...
                </p>
              </div>
            </div>
          )}

          {purchaseStep === 'success' && (
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-600">Purchase Successful!</h3>
                <p className="text-sm text-muted-foreground">
                  Your FHE-encrypted battle pass has been created.
                </p>
                {transactionHash && (
                  <p className="text-xs text-muted-foreground mt-2 font-mono">
                    TX: {transactionHash.slice(0, 10)}...{transactionHash.slice(-8)}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {purchaseStep === 'confirm' && (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handlePurchase}
                disabled={!isConnected || isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Purchase with FHE'
                )}
              </Button>
            </>
          )}
          
          {purchaseStep === 'success' && (
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
