# LB Computer Help Website Deployment Guide

## Vercel Deployment Steps

### 1. GitHub Integration Method (Recommended)

1. Go to [Vercel](https://vercel.com/) and sign up/login with your GitHub account
2. Click "Add New" > "Project"
3. Import your GitHub repository: `https://github.com/Brandonrz369/lbcom.git`
4. Vercel will automatically detect Next.js settings
5. Configure project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `out`
6. Click "Deploy"

### 2. Domain Configuration

#### Setting up lbcomputerhelp.com

1. In your Vercel project dashboard, go to "Settings" > "Domains"
2. Add your domain: `lbcomputerhelp.com`
3. Follow Vercel's instructions to update DNS settings at your domain registrar (GoDaddy)
   - Usually involves adding A records pointing to Vercel's IP addresses
   - May also need to add CNAME records
   - Allow up to 48 hours for DNS propagation

#### Setting up store subdomain (for Wix)

1. In your domain registrar (GoDaddy), create a CNAME record:
   - Name/Host: `store`
   - Value/Points to: Your Wix endpoint (provided by Wix)
2. This will make `store.lbcomputerhelp.com` point to your Wix store

### 3. Verifying Deployment

1. Check your deployment in Vercel dashboard
2. Test all features:
   - Navigation
   - Contact form submissions
   - Service assessment tool
   - Calendly booking system
3. Test on multiple devices and browsers

### 4. Troubleshooting

- **404 errors**: Check your vercel.json configuration
- **Form submission errors**: Verify Formspree endpoint
- **Image loading issues**: Ensure images are properly optimized

## Automatic Deployments

Vercel automatically deploys when you push to the connected GitHub repository:

1. Make changes locally
2. Commit changes: `git add . && git commit -m "Description of changes"`
3. Push to GitHub: `git push origin main`
4. Vercel will automatically detect changes and deploy

## Maintenance Tips

1. Keep dependencies updated: Run `npm update` periodically
2. Monitor form submissions in Formspree dashboard
3. Check Vercel analytics for performance insights

## Contact Information

For any deployment issues, contact:
- Your GitHub: https://github.com/Brandonrz369
- Vercel Support: https://vercel.com/support
- Formspree Support: https://help.formspree.io