# Deployment Options for Patrick Baxter's Portfolio

This document provides instructions for deploying the Angular portfolio website to various hosting platforms.

## General Build Instructions

Before deploying to any platform, you should build your application:

```bash
# Install dependencies if not already installed
npm install

# Build for production
ng build
```

This will create a `dist/` folder with your compiled application ready for deployment.

## Special Considerations

### Accessibility Features

The portfolio includes several accessibility features:
- High contrast mode
- Large text mode
- Reduced motion
- Text-to-speech
- Focus indicators

These are implemented via CSS classes and JavaScript, so they should work on all deployment platforms without additional configuration.

### Chatbot Data Persistence

The chatbot uses localStorage to persist conversations and analytics data. This is client-side only and doesn't require any server-side storage or APIs.

## Deployment Options

### 1. GitHub Pages

GitHub Pages is free and easy to set up for personal portfolio sites.

1. First, install the angular-cli-ghpages package:
   ```bash
   npm install -g angular-cli-ghpages
   ```

2. Build your application with the proper base href:
   ```bash
   ng build --base-href="https://sgtsaughter.github.io/portfolio-angular/"
   ```

3. Deploy to GitHub Pages:
   ```bash
   npx angular-cli-ghpages --dir=dist/portfolio/browser
   ```

### 2. Netlify

Netlify offers continuous deployment and a generous free tier.

1. Create an account on [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `ng build`
   - Publish directory: `dist/portfolio/browser`
4. Deploy

### 3. Vercel

Vercel is optimized for frontend frameworks like Angular.

1. Create an account on [Vercel](https://vercel.com)
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Deploy from your project directory:
   ```bash
   vercel
   ```
4. Follow the prompts to configure your deployment

### 4. Firebase Hosting

Firebase provides reliable hosting with a generous free tier.

1. Create a Firebase account and project
2. Install Firebase tools:
   ```bash
   npm install -g firebase-tools
   ```
3. Initialize Firebase in your project:
   ```bash
   firebase login
   firebase init
   ```
   - Select Hosting
   - Select your Firebase project
   - Set the public directory to `dist/portfolio/browser`
   - Configure as a single-page app: Yes
4. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Custom Domain Setup

Once deployed, you can add a custom domain through your chosen platform's settings. Each platform has specific instructions for domain configuration.

## Updating the Deployed Site

For GitHub Pages, Netlify, and Vercel, pushing to your connected repository will automatically trigger a new build and deployment. For Firebase and other platforms, you'll need to run the deployment command again after making changes.
