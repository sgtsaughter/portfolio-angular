# PowerShell script to deploy Angular app to GitHub Pages

# Build the Angular application with proper base href
Write-Host "Building the Angular application..." -ForegroundColor Green
ng build --base-href="https://sgtsaughter.github.io/portfolio-angular/"

# Check if angular-cli-ghpages is installed
$checkNpx = npx angular-cli-ghpages --version 2>$null
if (-not $?) {
    Write-Host "Installing angular-cli-ghpages..." -ForegroundColor Yellow
    npm install -g angular-cli-ghpages
}

# Deploy to GitHub Pages
Write-Host "Deploying to GitHub Pages..." -ForegroundColor Green
npx angular-cli-ghpages --dir=dist/portfolio/browser

Write-Host "Deployment complete! Your portfolio is now available at https://sgtsaughter.github.io/portfolio-angular/" -ForegroundColor Cyan
