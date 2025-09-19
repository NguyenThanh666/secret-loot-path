# Vercel Deployment Guide for Secret Loot Path

## Step-by-Step Manual Deployment Instructions

### Prerequisites
- GitHub account with access to the repository
- Vercel account (free tier available)
- Environment variables ready

### Step 1: Connect Repository to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" or "Add New..." 
   - Select "Import Git Repository"
   - Choose `NguyenThanh666/secret-loot-path` from the list
   - Click "Import"

### Step 2: Configure Project Settings

1. **Framework Preset**
   - Framework Preset: `Vite`
   - Root Directory: `./` (default)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

2. **Environment Variables**
   Click "Environment Variables" and add the following:

   ```
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_RPC_URL=your_rpc_url_here
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_INFURA_API_KEY=your_api_key_here
   ```

3. **Build Settings**
   - Node.js Version: `18.x` (recommended)
   - Enable "Automatically expose System Environment Variables"

### Step 3: Deploy

1. **Initial Deployment**
   - Click "Deploy" button
   - Wait for build to complete (usually 2-3 minutes)
   - Note the deployment URL provided

2. **Verify Deployment**
   - Visit the provided URL
   - Test wallet connection functionality
   - Verify all features are working

### Step 4: Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to Project Settings > Domains
   - Click "Add Domain"
   - Enter your custom domain
   - Follow DNS configuration instructions

2. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - HTTPS will be enabled automatically

### Step 5: Environment-Specific Configuration

#### Production Environment
- All environment variables should be set in Vercel dashboard
- Ensure `NEXT_PUBLIC_` variables are properly configured
- Test wallet connections on Sepolia testnet

#### Development Environment
- Use local `.env.local` file for development
- Run `npm run dev` for local testing
- Test all wallet integrations locally first

### Step 6: Monitoring and Updates

1. **Automatic Deployments**
   - Vercel will automatically deploy on every push to `main` branch
   - Preview deployments for pull requests

2. **Build Logs**
   - Monitor build logs in Vercel dashboard
   - Check for any build errors or warnings

3. **Performance Monitoring**
   - Use Vercel Analytics for performance insights
   - Monitor Core Web Vitals

### Troubleshooting

#### Common Issues

1. **Build Failures**
   - Check Node.js version (use 18.x)
   - Verify all dependencies are in package.json
   - Check for TypeScript errors

2. **Environment Variables**
   - Ensure all `NEXT_PUBLIC_` variables are set
   - Verify variable names match exactly
   - Check for typos in values

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Test on different networks

#### Build Optimization

1. **Bundle Size**
   - Use dynamic imports for large libraries
   - Optimize images and assets
   - Enable tree shaking

2. **Performance**
   - Enable Vercel Edge Functions if needed
   - Use CDN for static assets
   - Optimize for Core Web Vitals

### Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's secure environment variable storage
   - Rotate keys regularly

2. **Wallet Security**
   - Implement proper wallet validation
   - Use secure RPC endpoints
   - Validate all user inputs

### Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] Wallet connection works (Rainbow, MetaMask, etc.)
- [ ] All UI components render correctly
- [ ] Environment variables are properly set
- [ ] No console errors in browser
- [ ] Mobile responsiveness works
- [ ] SSL certificate is active
- [ ] Custom domain (if used) is working
- [ ] Analytics and monitoring are set up

### Support and Maintenance

1. **Regular Updates**
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Test after each deployment

2. **Performance Monitoring**
   - Use Vercel Analytics
   - Monitor Core Web Vitals
   - Set up alerts for downtime

3. **Backup Strategy**
   - Repository is the source of truth
   - Environment variables are backed up in Vercel
   - Regular database backups if applicable

### Cost Optimization

1. **Free Tier Limits**
   - 100GB bandwidth per month
   - 100 serverless function executions
   - Unlimited static deployments

2. **Upgrade Considerations**
   - Monitor usage in Vercel dashboard
   - Upgrade to Pro plan if needed
   - Consider Enterprise for high-traffic applications

This deployment guide ensures a smooth transition from development to production with proper configuration and monitoring in place.
