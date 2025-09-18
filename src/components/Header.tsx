import { ConnectButton } from '@rainbow-me/rainbowkit';
import trophyLogo from "@/assets/trophy-pixel-logo.png";

const Header = () => {
  return (
    <header className="relative z-10 border-b border-border bg-card/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={trophyLogo} 
              alt="Trophy Pixel Logo" 
              className="h-12 w-12 pixelated gaming-glow"
            />
            <div>
              <h2 className="text-xl font-bold text-primary neon-text">Secret Loot Path</h2>
              <p className="text-sm text-muted-foreground">FHE-Encrypted Gaming</p>
            </div>
          </div>

          {/* Header Message */}
          <div className="hidden md:block text-center">
            <h1 className="text-2xl font-bold text-foreground neon-text">
              Play Freely, Reveal on Your Terms.
            </h1>
          </div>

          {/* Wallet Connect */}
          <ConnectButton 
            chainStatus="icon"
            accountStatus="avatar"
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
        </div>

        {/* Mobile Header Message */}
        <div className="md:hidden mt-4 text-center">
          <h1 className="text-lg font-bold text-foreground neon-text">
            Play Freely, Reveal on Your Terms.
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;