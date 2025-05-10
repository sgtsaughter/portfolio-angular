#!/bin/bash

# Build the Angular application with proper base href
ng build --base-href="https://sgtsaughter.github.io/portfolio-angular/"

# Install angular-cli-ghpages if not already installed
if ! command -v npx angular-cli-ghpages &> /dev/null
then
    echo "Installing angular-cli-ghpages..."
    npm install -g angular-cli-ghpages
fi

# Deploy to GitHub Pages
npx angular-cli-ghpages --dir=dist/portfolio/browser

echo "Deployment complete! Your portfolio is now available at https://sgtsaughter.github.io/portfolio-angular/"
