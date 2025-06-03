#!/usr/bin/env node

// Script to generate all SEO and image assets for PasherDokan
import { generateAllImageAssets } from './src/utils/imageGenerator.js';

console.log('🚀 Generating SEO and Image Assets for PasherDokan...\n');

try {
  await generateAllImageAssets();
  console.log('\n✅ All assets generated successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Install puppeteer: npm install -g puppeteer');
  console.log('2. Run: chmod +x generate-og-images.sh && ./generate-og-images.sh');
  console.log('3. Install ImageMagick: brew install imagemagick (Mac) or apt-get install imagemagick (Ubuntu)');
  console.log('4. Run: chmod +x generate-favicons.sh && ./generate-favicons.sh');
  console.log('5. Replace placeholder images with actual photos');
  console.log('6. Test structured data with Google Rich Results Test');
  console.log('7. Submit sitemap to Google Search Console');
} catch (error) {
  console.error('❌ Error generating assets:', error);
  process.exit(1);
}
