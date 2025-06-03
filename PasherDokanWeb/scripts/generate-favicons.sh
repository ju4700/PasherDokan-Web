#!/bin/bash

# Generate favicon files from SVG using ImageMagick
# This script creates all required favicon formats

echo "🎨 Generating favicon files..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick not found. Installing..."
    if command -v apt-get &> /dev/null; then
        sudo apt-get update && sudo apt-get install -y imagemagick
    elif command -v brew &> /dev/null; then
        brew install imagemagick
    else
        echo "❌ Please install ImageMagick manually"
        exit 1
    fi
fi

# Create SVG favicon source
cat > favicon-source.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="32" cy="32" r="30" fill="url(#gradient)" stroke="#1e40af" stroke-width="2"/>
  
  <!-- Shop icon -->
  <g fill="white">
    <!-- Building base -->
    <rect x="18" y="35" width="28" height="18" rx="2"/>
    
    <!-- Roof -->
    <path d="M15 32 L32 22 L49 32 L47 30 L32 20 L17 30 Z"/>
    
    <!-- Door -->
    <rect x="28" y="42" width="8" height="11" fill="#1e40af"/>
    <circle cx="34" cy="47" r="1" fill="white"/>
    
    <!-- Windows -->
    <rect x="21" y="38" width="4" height="4" fill="#1e40af"/>
    <rect x="39" y="38" width="4" height="4" fill="#1e40af"/>
    
    <!-- Shop sign -->
    <rect x="20" y="26" width="24" height="6" rx="3" fill="white"/>
    <text x="32" y="31" text-anchor="middle" font-family="Arial" font-size="4" fill="#2563eb" font-weight="bold">PD</text>
  </g>
</svg>
EOF

# Create public directory if it doesn't exist
mkdir -p public

# Generate various favicon sizes
echo "📱 Generating favicon sizes..."

# ICO format (for legacy browsers)
convert favicon-source.svg -resize 32x32 -background transparent favicon-32.png
convert favicon-source.svg -resize 16x16 -background transparent favicon-16.png
convert favicon-16.png favicon-32.png public/favicon.ico

# PNG favicons for different uses
convert favicon-source.svg -resize 16x16 -background transparent public/favicon-16x16.png
convert favicon-source.svg -resize 32x32 -background transparent public/favicon-32x32.png
convert favicon-source.svg -resize 96x96 -background transparent public/favicon-96x96.png

# Apple Touch Icons
convert favicon-source.svg -resize 180x180 -background transparent public/apple-touch-icon.png
convert favicon-source.svg -resize 152x152 -background transparent public/apple-touch-icon-152x152.png
convert favicon-source.svg -resize 144x144 -background transparent public/apple-touch-icon-144x144.png
convert favicon-source.svg -resize 120x120 -background transparent public/apple-touch-icon-120x120.png
convert favicon-source.svg -resize 114x114 -background transparent public/apple-touch-icon-114x114.png
convert favicon-source.svg -resize 76x76 -background transparent public/apple-touch-icon-76x76.png
convert favicon-source.svg -resize 72x72 -background transparent public/apple-touch-icon-72x72.png
convert favicon-source.svg -resize 60x60 -background transparent public/apple-touch-icon-60x60.png
convert favicon-source.svg -resize 57x57 -background transparent public/apple-touch-icon-57x57.png

# Android Chrome icons
convert favicon-source.svg -resize 192x192 -background transparent public/android-chrome-192x192.png
convert favicon-source.svg -resize 512x512 -background transparent public/android-chrome-512x512.png

# Microsoft tile icons
convert favicon-source.svg -resize 144x144 -background "#2563eb" public/mstile-144x144.png
convert favicon-source.svg -resize 150x150 -background "#2563eb" public/mstile-150x150.png
convert favicon-source.svg -resize 310x150 -background "#2563eb" -gravity center -extent 310x150 public/mstile-310x150.png
convert favicon-source.svg -resize 310x310 -background "#2563eb" public/mstile-310x310.png
convert favicon-source.svg -resize 70x70 -background "#2563eb" public/mstile-70x70.png

# Safari pinned tab (monochrome SVG)
cat > public/safari-pinned-tab.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <path d="M32 2 C48.5 2 62 15.5 62 32 C62 48.5 48.5 62 32 62 C15.5 62 2 48.5 2 32 C2 15.5 15.5 2 32 2 Z M15 32 L32 22 L49 32 L47 30 L32 20 L17 30 Z M18 35 L46 35 C47.1 35 48 35.9 48 37 L48 51 C48 52.1 47.1 53 46 53 L18 53 C16.9 53 16 52.1 16 51 L16 37 C16 35.9 16.9 35 18 35 Z M28 42 L36 42 L36 53 L28 53 Z M21 38 L25 38 L25 42 L21 42 Z M39 38 L43 38 L43 42 L39 42 Z" fill="black"/>
</svg>
EOF

# Create web app manifest
cat > public/site.webmanifest << 'EOF'
{
    "name": "PasherDokan - Smart E-commerce Platform",
    "short_name": "PasherDokan",
    "description": "Smart e-commerce platform for small businesses in Bangladesh",
    "icons": [
        {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#2563eb",
    "background_color": "#ffffff",
    "start_url": "/",
    "display": "standalone",
    "orientation": "portrait-primary",
    "lang": "en",
    "scope": "/",
    "categories": ["business", "shopping", "productivity"]
}
EOF

# Create browserconfig.xml for Microsoft tiles
cat > public/browserconfig.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square70x70logo src="/mstile-70x70.png"/>
            <square150x150logo src="/mstile-150x150.png"/>
            <wide310x150logo src="/mstile-310x150.png"/>
            <square310x310logo src="/mstile-310x310.png"/>
            <TileColor>#2563eb</TileColor>
        </tile>
    </msapplication>
</browserconfig>
EOF

# Copy SVG as well
cp favicon-source.svg public/favicon.svg

# Clean up temporary files
rm favicon-source.svg favicon-16.png favicon-32.png

echo "✅ Favicon generation complete!"
echo "📁 Generated files in public/ directory:"
echo "   - favicon.ico (legacy browser support)"
echo "   - favicon.svg (modern browsers)"
echo "   - Various PNG sizes for different devices"
echo "   - Apple Touch Icons for iOS"
echo "   - Android Chrome icons"
echo "   - Microsoft tile icons"
echo "   - Web app manifest"
echo "   - Browser configuration files"
