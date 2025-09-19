# 🎮 Secret Loot Path - Next-Gen Encrypted Gaming

<div align="center">
  <img src="public/favicon.svg" alt="Secret Loot Path Logo" width="120" height="120">
  
  **Revolutionary FHE-Encrypted Gaming Platform**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
</div>

---

## 🌟 What Makes Us Different?

**Secret Loot Path** isn't just another gaming platform—it's a **privacy revolution**. We're the first gaming platform to implement **Fully Homomorphic Encryption (FHE)** at scale, ensuring your gaming data remains completely private while still being verifiable on-chain.

### 🔐 Core Innovation

- **Zero-Knowledge Gaming**: Play without revealing your progress until you choose to
- **FHE-Encrypted Rewards**: Battle pass rewards encrypted until claimed
- **Privacy-First Architecture**: Your gaming data stays private, always
- **Cross-Chain Compatibility**: Deploy on any EVM-compatible network

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/secret-loot-path.git

# Navigate to project directory
cd secret-loot-path

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env.local` file:

```env
# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_url_here
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_INFURA_API_KEY=your_api_key_here
```

## 🏗️ Architecture

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
│   ├── wagmi.ts        # Wallet configuration
│   └── providers.tsx   # App providers
├── assets/             # Static assets
└── contracts/          # Smart contract files
    └── SecretLootPath.sol
```

## 🎯 Key Features

### 🔒 FHE-Encrypted Battle Pass
- **Private Progress Tracking**: Your gaming progress is encrypted using FHE
- **Selective Revelation**: Choose when and what to reveal
- **Verifiable Rewards**: Prove you earned rewards without revealing how

### 💼 Multi-Wallet Support
- **RainbowKit Integration**: Support for 20+ wallet providers
- **Cross-Platform**: Works on desktop and mobile
- **Secure Connection**: Industry-standard wallet security

### 🎮 Gaming Features
- **Real-time Dashboard**: Track your encrypted progress
- **Tier-based Rewards**: Unlock rewards as you progress
- **Reputation System**: Build your gaming reputation privately

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Smart Contract Integration

Our FHE-enabled smart contracts provide:

- **Encrypted Data Storage**: All sensitive data encrypted on-chain
- **Private Computations**: FHE operations for private calculations
- **Verifiable Results**: Prove computations without revealing inputs

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@secretlootpath.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/secret-loot-path/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/secret-loot-path/discussions)

## 🙏 Acknowledgments

- [FHEVM](https://github.com/fhenixprotocol/fhevm) for FHE implementation
- [RainbowKit](https://www.rainbowkit.com/) for wallet integration
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components

---

<div align="center">
  <strong>Built with ❤️ for privacy-first gaming</strong>
</div>
