# LB Computer Help Website - Commands and Notes

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Serve production build locally**: `npm run serve`
- **Run linting**: `npm run lint`

## Deployment Options

1. **Vercel (Easiest)**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   ```bash
   npm install -g netlify-cli
   npm run build
   netlify deploy
   ```

3. **Static hosting (S3, GitHub Pages, etc.)**
   ```bash
   npm run build
   # Upload the 'out' directory to your hosting provider
   ```

## Design Preferences

- **Primary color**: Blue (#2563eb)
- **Secondary/accent color**: Orange (#f97316)
- **Font**: Geist Sans for text, Geist Mono for code

## Project Structure

- `/src/app` - Main pages
- `/src/components` - Reusable UI components
- `/public` - Static assets (images, fonts, etc.)

## Important Notes

- The hero background image should be located at `/public/images/tech-background.svg`
- The contact form is set up for client-side validation but needs backend implementation
- The website is set up for static export