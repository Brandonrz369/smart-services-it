# LB Computer Help Website

A modern, responsive website for LB Computer Help built with Next.js and Tailwind CSS.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes, as well as deploy it to production.

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git

### Installing

1. Clone the repository

```bash
git clone <repository-url>
cd lbcom
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

## Adding Background Images

The hero section background image needs to be added to the `/public/images/` directory:

1. Create a high-quality image file named `tech-background.jpg` (recommended size: at least 1920x1080px)
2. Place it in the `/public/images/` directory
3. The image will automatically be displayed in the hero section

## Deployment Options

### Option 1: Vercel (Easiest)

1. Create an account on [Vercel](https://vercel.com)
2. Install the Vercel CLI:

```bash
npm install -g vercel
```

3. Deploy your site:

```bash
vercel
```

4. Follow the prompts to complete the deployment.

### Option 2: Netlify

1. Create an account on [Netlify](https://www.netlify.com/)
2. Install the Netlify CLI:

```bash
npm install -g netlify-cli
```

3. Build your site:

```bash
npm run build
# or
yarn build
```

4. Deploy your site:

```bash
netlify deploy
```

### Option 3: Traditional Web Hosting

1. Build your site:

```bash
npm run build
# or
yarn build
```

2. The build output will be in the `.next` folder
3. Upload the following to your web server:

   - `.next` folder
   - `public` folder
   - `package.json` file
   - `next.config.js` file

4. On your server, install Node.js and run:

```bash
npm install
npm start
```

5. Configure your web server to proxy requests to the Node.js server.

### Option 4: Static Export

If you prefer a static HTML export that can be hosted anywhere:

1. Add the following to your `next.config.js`:

```js
module.exports = {
  output: "export",
};
```

2. Build your site:

```bash
npm run build
# or
yarn build
```

3. The static HTML files will be in the `out` directory
4. Upload the entire `out` directory to any static hosting service like:
   - Amazon S3
   - GitHub Pages
   - Any traditional web hosting

## Customizing Content

- Edit page content in `/src/app/page.tsx` and `/src/app/services/page.tsx`
- Add or modify components in `/src/components/`
- Update styling in `/src/app/globals.css`

## Setting Up a Custom Domain

1. Purchase a domain name from a registrar like Namecheap, GoDaddy, or Google Domains
2. Point your domain's DNS settings to your hosting provider:

   - For Vercel: Add the domain in the Vercel dashboard and follow their instructions
   - For Netlify: Add the domain in the Netlify dashboard and follow their instructions
   - For traditional hosting: Update your domain's A records to point to your server's IP address

3. Set up SSL/HTTPS:
   - Vercel and Netlify provide this automatically
   - For traditional hosting, you can use Let's Encrypt to get a free SSL certificate

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
