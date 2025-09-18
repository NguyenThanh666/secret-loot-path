const Footer = () => {
  const pixelElements = Array.from({ length: 50 }, (_, i) => i);

  return (
    <footer className="relative mt-16 bg-card border-t border-border overflow-hidden">
      {/* Pixelated Fire Animation */}
      <div className="absolute -top-2 left-0 right-0 h-8 flex items-end justify-center">
        {pixelElements.map((i) => (
          <div
            key={i}
            className="w-2 bg-gradient-to-t from-destructive via-accent to-secondary pixelated animate-pixel-fire"
            style={{
              height: `${Math.random() * 16 + 8}px`,
              animationDelay: `${Math.random() * 0.8}s`,
              animationDuration: `${0.6 + Math.random() * 0.4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section */}
          <div>
            <h3 className="text-lg font-bold text-primary neon-text mb-4">Hidden Battle Pass</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Revolutionary gaming experience with encrypted rewards. 
              Play freely, reveal on your terms.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-primary/20 rounded pixelated"></div>
              <div className="w-8 h-8 bg-secondary/20 rounded pixelated"></div>
              <div className="w-8 h-8 bg-accent/20 rounded pixelated"></div>
            </div>
          </div>

          {/* Center Section */}
          <div>
            <h4 className="text-md font-semibold text-foreground mb-4">Game Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Encrypted Battle Pass Tiers
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                Mystery Reward System
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Seasonal Content Drops
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                Decentralized Ownership
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <h4 className="text-md font-semibold text-foreground mb-4">Connect</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Discord Community</p>
              <p>Twitter Updates</p>
              <p>GitHub Repository</p>
              <p>Documentation</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Hidden Battle Pass. Play Freely, Reveal on Your Terms.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;