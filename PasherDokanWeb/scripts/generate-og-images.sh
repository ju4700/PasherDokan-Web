#!/bin/bash

# Generate actual OG images from HTML templates using Puppeteer
# This script creates real PNG images from the HTML templates

echo "🎨 Generating Open Graph images..."

# Create output directory
mkdir -p public/images/og

# Install puppeteer if not installed
if ! npm list puppeteer > /dev/null 2>&1; then
    echo "📦 Installing Puppeteer..."
    npm install --save-dev puppeteer
fi

# Create the image generation script
cat > generate-og-images.js << 'EOF'
const puppeteer = require('puppeteer');
const fs = require('fs');

const ogTemplates = {
  'home': {
    title: 'PasherDokan - দোকানদারদের জন্য স্মার্ট ই-কমার্স প্ল্যাটফর্ম',
    subtitle: 'বাংলাদেশের ছোট ব্যবসায়ীদের জন্য সহজ ডিজিটাল সমাধান',
    color: '#2563eb'
  },
  'features': {
    title: 'Features - বৈশিষ্ট্যসমূহ',
    subtitle: 'আপনার দোকানের জন্য প্রয়োজনীয় সমস্ত ফিচার',
    color: '#059669'
  },
  'shopkeepers': {
    title: 'For Shopkeepers - দোকানদারদের জন্য',
    subtitle: 'আমাদের সাথে যুক্ত হন এবং ব্যবসা বাড়ান',
    color: '#dc2626'
  },
  'download': {
    title: 'Download App - অ্যাপ ডাউনলোড করুন',
    subtitle: 'আজই শুরু করুন আপনার ডিজিটাল যাত্রা',
    color: '#7c3aed'
  },
  'contact': {
    title: 'Contact Us - যোগাযোগ',
    subtitle: 'আমাদের সাথে যোগাযোগ করুন যেকোনো সহায়তার জন্য',
    color: '#ea580c'
  }
};

const generateOGHTML = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      margin: 0;
      padding: 0;
      width: 1200px;
      height: 630px;
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: linear-gradient(135deg, ${data.color}15 0%, ${data.color}25 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .container {
      text-align: center;
      z-index: 2;
      max-width: 900px;
      padding: 40px;
    }
    .logo {
      font-size: 48px;
      font-weight: 900;
      color: ${data.color};
      margin-bottom: 20px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .title {
      font-size: 42px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 16px;
      line-height: 1.2;
    }
    .subtitle {
      font-size: 28px;
      color: #6b7280;
      font-weight: 500;
      line-height: 1.3;
    }
    .pattern {
      position: absolute;
      top: -50px;
      right: -50px;
      width: 300px;
      height: 300px;
      background: ${data.color};
      opacity: 0.1;
      border-radius: 50%;
      transform: rotate(45deg);
    }
    .pattern2 {
      position: absolute;
      bottom: -100px;
      left: -100px;
      width: 200px;
      height: 200px;
      background: ${data.color};
      opacity: 0.08;
      border-radius: 50%;
    }
    .website {
      position: absolute;
      bottom: 30px;
      right: 40px;
      font-size: 20px;
      color: #9ca3af;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="pattern"></div>
  <div class="pattern2"></div>
  <div class="container">
    <div class="logo">PasherDokan</div>
    <div class="title">${data.title}</div>
    <div class="subtitle">${data.subtitle}</div>
  </div>
  <div class="website">pasherdokan.shop</div>
</body>
</html>
`;

async function generateImages() {
  console.log('🚀 Starting image generation...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  for (const [section, data] of Object.entries(ogTemplates)) {
    try {
      console.log(`📸 Generating ${section} OG image...`);
      
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 630 });
      
      const html = generateOGHTML(data);
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      const screenshot = await page.screenshot({
        type: 'png',
        quality: 100,
        fullPage: false
      });
      
      fs.writeFileSync(`public/images/og/og-${section}.png`, screenshot);
      console.log(`✅ Generated og-${section}.png`);
      
      await page.close();
    } catch (error) {
      console.error(`❌ Error generating ${section} image:`, error.message);
    }
  }
  
  await browser.close();
  console.log('🎉 Image generation complete!');
}

generateImages().catch(console.error);
EOF

# Run the image generation
node generate-og-images.js

# Clean up
rm generate-og-images.js

echo "✅ Open Graph images generated successfully!"
