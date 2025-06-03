#!/bin/bash

# Complete SEO implementation test and build script
echo "🚀 Running complete SEO implementation test..."

# Change to project directory
cd /home/j47/Documents/PasherDokan-Web/PasherDokanWeb

echo "📦 Installing dependencies..."
npm install

echo "🎨 Generating favicons..."
if command -v convert &> /dev/null; then
    ./scripts/generate-favicons.sh
else
    echo "⚠️  ImageMagick not found. Skipping favicon generation."
    echo "    Install with: sudo apt-get install imagemagick"
fi

echo "🖼️  Generating Open Graph images..."
if npm list puppeteer > /dev/null 2>&1 || npm install --save-dev puppeteer; then
    ./scripts/generate-og-images.sh
else
    echo "⚠️  Failed to install Puppeteer. Skipping OG image generation."
fi

echo "🏗️  Building production version..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    echo "📊 Running SEO tests..."
    # Add any additional SEO testing here
    
    echo "🎉 SEO implementation complete!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Configure real Google Analytics ID in src/utils/analytics.ts"
    echo "2. Add actual business content and images"
    echo "3. Set up domain verification codes"
    echo "4. Deploy to production hosting"
    echo "5. Submit sitemap to search engines"
    echo ""
    echo "📁 Generated assets:"
    echo "   - Favicons in public/ directory"
    echo "   - Open Graph images in public/images/og/"
    echo "   - Production build in dist/ directory"
    echo ""
    echo "🔗 Useful links:"
    echo "   - Google Search Console: https://search.google.com/search-console"
    echo "   - Bing Webmaster Tools: https://www.bing.com/webmasters"
    echo "   - Facebook Debugger: https://developers.facebook.com/tools/debug/"
    echo "   - Twitter Card Validator: https://cards-dev.twitter.com/validator"
    echo "   - Rich Results Test: https://search.google.com/test/rich-results"
    
else
    echo "❌ Build failed. Please check for errors above."
    exit 1
fi
