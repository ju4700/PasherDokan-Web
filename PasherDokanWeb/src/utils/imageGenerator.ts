import { promises as fs } from 'fs';
import { join } from 'path';

// Generate Open Graph images for different sections
export const generateOGImages = async () => {
  const sections = [
    {
      name: 'home',
      title: 'PasherDokan - Digital Solutions for Local Shops',
      subtitle: 'Hyperlocal E-commerce Platform for Bangladesh SMEs',
      primaryColor: '#059669', // emerald-600
      bgGradient: 'linear-gradient(135deg, #065f46 0%, #059669 100%)'
    },
    {
      name: 'features',
      title: 'PasherDokan Features',
      subtitle: 'Complete Digital Commerce Solution',
      primaryColor: '#648DDB', // custom primary
      bgGradient: 'linear-gradient(135deg, #4f46e5 0%, #648DDB 100%)'
    },
    {
      name: 'team',
      title: 'Meet the PasherDokan Team',
      subtitle: "Building Bangladesh's Digital Future",
      primaryColor: '#0369a1', // sky-700
      bgGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)'
    },
    {
      name: 'vision',
      title: 'Our Vision',
      subtitle: "Empowering Bangladesh's Digital Economy",
      primaryColor: '#7c3aed', // violet-600
      bgGradient: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)'
    },
    {
      name: 'contact',
      title: 'Contact PasherDokan',
      subtitle: 'Start Your Digital Transformation',
      primaryColor: '#dc2626', // red-600
      bgGradient: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)'
    },
    {
      name: 'faq',
      title: 'Frequently Asked Questions',
      subtitle: 'Get Answers About PasherDokan',
      primaryColor: '#ca8a04', // yellow-600
      bgGradient: 'linear-gradient(135deg, #a16207 0%, #ca8a04 100%)'
    },
    {
      name: 'milestones',
      title: 'Our Journey',
      subtitle: 'PasherDokan Milestones & Achievements',
      primaryColor: '#ea580c', // orange-600
      bgGradient: 'linear-gradient(135deg, #c2410c 0%, #ea580c 100%)'
    }
  ];

  // Generate HTML files for each section (for manual conversion to images)
  const htmlTemplate = (section: typeof sections[0]) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>OG Image - ${section.name}</title>
      <style>
        body { 
          margin: 0; 
          font-family: 'Inter', 'Arial', sans-serif; 
          background: ${section.bgGradient};
          width: 1200px;
          height: 630px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 80px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }
        
        .pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 2px);
          background-size: 50px 50px;
        }
        
        .logo {
          position: absolute;
          top: 80px;
          left: 80px;
          width: 80px;
          height: 80px;
          background: rgba(255,255,255,0.15);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          color: white;
        }
        
        .main-title {
          font-size: 64px;
          font-weight: 800;
          color: white;
          margin: 0 0 20px 0;
          line-height: 1.1;
          max-width: 800px;
        }
        
        .subtitle {
          font-size: 32px;
          font-weight: 500;
          color: white;
          opacity: 0.9;
          margin: 0 0 40px 0;
          max-width: 700px;
        }
        
        .tags {
          display: flex;
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .tag {
          background: rgba(255,255,255,0.2);
          color: white;
          padding: 12px 24px;
          border-radius: 20px;
          font-size: 16px;
          font-weight: 600;
        }
        
        .url {
          font-size: 24px;
          color: white;
          opacity: 0.8;
          font-weight: 500;
        }
        
        .decorative {
          position: absolute;
          right: 100px;
          top: 50%;
          transform: translateY(-50%);
          width: 300px;
          height: 300px;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
        }
        
        .decorative::before {
          content: '';
          position: absolute;
          top: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          background: rgba(255,255,255,0.03);
          border-radius: 50%;
        }
      </style>
    </head>
    <body>
      <div class="pattern"></div>
      <div class="logo">PD</div>
      <h1 class="main-title">${section.title}</h1>
      <p class="subtitle">${section.subtitle}</p>
      <div class="tags">
        <span class="tag">Bangladesh SME</span>
        <span class="tag">Digital Commerce</span>
      </div>
      <div class="url">pasherdokan.shop</div>
      <div class="decorative"></div>
    </body>
    </html>
  `;

  // Create public/images directory if it doesn't exist
  const imagesDir = join(process.cwd(), 'public', 'images');
  try {
    await fs.access(imagesDir);
  } catch {
    await fs.mkdir(imagesDir, { recursive: true });
  }

  // Generate HTML files for each section
  for (const section of sections) {
    const htmlContent = htmlTemplate(section);
    const filename = section.name === 'home' ? 'og-image.html' : `${section.name}-og.html`;
    await fs.writeFile(join(imagesDir, filename), htmlContent);
    console.log(`Generated ${filename}`);
  }

  // Create a script to help convert HTML to images
  const conversionScript = `
#!/bin/bash
# Script to convert HTML files to OG images using puppeteer or similar tool
# Usage: ./generate-og-images.sh

echo "Converting HTML files to OG images..."

# Install puppeteer if not installed
# npm install -g puppeteer

for file in public/images/*-og.html public/images/og-image.html; do
  if [ -f "$file" ]; then
    basename=$(basename "$file" .html)
    echo "Converting $file to $basename.jpg"
    
    # Using puppeteer to convert HTML to image
    node -e "
      const puppeteer = require('puppeteer');
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 630 });
        await page.goto('file://' + require('path').resolve('$file'));
        await page.screenshot({ 
              path: 'public/images/\${basename}.jpg', 
              type: 'jpeg', 
              quality: 90 
            });
        await browser.close();
      })();
    "
  fi
done

echo "OG image generation complete!"
  `;

  await fs.writeFile(join(process.cwd(), 'generate-og-images.sh'), conversionScript);
  
  // Generate Twitter Card images (different dimensions)
  for (const section of sections) {
    const twitterHtml = htmlTemplate(section).replace('1200px', '1200px').replace('630px', '600px');
    const filename = section.name === 'home' ? 'twitter-image.html' : `${section.name}-twitter.html`;
    await fs.writeFile(join(imagesDir, filename), twitterHtml);
  }

  console.log('Generated OG image templates and conversion script');
  console.log('Run ./generate-og-images.sh to convert HTML to images (requires puppeteer)');
};

// Generate favicon files
export const generateFavicons = async () => {
  const faviconSizes = [16, 32, 48, 64, 128, 256];
  
  const faviconSvg = `
    <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#065f46"/>
          <stop offset="100%" style="stop-color:#059669"/>
        </linearGradient>
      </defs>
      
      <!-- Background circle -->
      <circle cx="128" cy="128" r="120" fill="url(#gradient)"/>
      
      <!-- PD text -->
      <text x="128" y="150" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="80" font-weight="bold">
        PD
      </text>
      
      <!-- Small decorative dot -->
      <circle cx="180" cy="100" r="8" fill="white" opacity="0.8"/>
    </svg>
  `;

  const publicDir = join(process.cwd(), 'public');
  
  // Generate SVG favicon
  await fs.writeFile(join(publicDir, 'favicon.svg'), faviconSvg);
  
  // Generate ICO conversion script
  const icoScript = `
#!/bin/bash
# Convert SVG to ICO and PNG favicons
# Requires ImageMagick: brew install imagemagick (Mac) or apt-get install imagemagick (Ubuntu)

echo "Converting SVG to favicon formats..."

# Convert to ICO
convert public/favicon.svg -resize 32x32 public/favicon.ico

# Convert to PNG for different sizes
${faviconSizes.map(size => 
  `convert public/favicon.svg -resize ${size}x${size} public/favicon-${size}.png`
).join('\n')}

# Generate Apple Touch Icon
convert public/favicon.svg -resize 180x180 public/apple-touch-icon.png

# Generate Android Chrome icons
convert public/favicon.svg -resize 192x192 public/android-chrome-192x192.png
convert public/favicon.svg -resize 512x512 public/android-chrome-512x512.png

echo "Favicon generation complete!"
  `;

  await fs.writeFile(join(process.cwd(), 'generate-favicons.sh'), icoScript);
  
  // Generate web app manifest
  const manifest = {
    name: "PasherDokan",
    short_name: "PasherDokan",
    description: "Digital Solutions for Local Shops in Bangladesh",
    start_url: "/",
    display: "standalone",
    background_color: "#065f46",
    theme_color: "#059669",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ],
    categories: ["business", "productivity", "shopping"],
    lang: "en",
    dir: "ltr"
  };

  await fs.writeFile(join(publicDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  
  console.log('Generated favicon templates and manifest');
  console.log('Run ./generate-favicons.sh to convert SVG to favicon formats (requires ImageMagick)');
};

// Generate placeholder images with proper dimensions
export const generatePlaceholderImages = async () => {
  const placeholders = [
    { name: 'hero-bg', width: 1920, height: 1080, color: '#065f46' },
    { name: 'features-bg', width: 1200, height: 600, color: '#0f766e' },
    { name: 'team-photo', width: 400, height: 400, color: '#0c4a6e' },
    { name: 'logo', width: 200, height: 200, color: '#059669' }
  ];

  const imagesDir = join(process.cwd(), 'public', 'images');
  
  for (const placeholder of placeholders) {
    const svg = `
      <svg width="${placeholder.width}" height="${placeholder.height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${placeholder.color}"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="Arial, sans-serif" font-size="24" opacity="0.7">
          ${placeholder.name.replace('-', ' ').toUpperCase()}
        </text>
        <text x="50%" y="60%" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="Arial, sans-serif" font-size="16" opacity="0.5">
          ${placeholder.width} × ${placeholder.height}
        </text>
      </svg>
    `;
    
    await fs.writeFile(join(imagesDir, `${placeholder.name}.svg`), svg);
  }
  
  console.log('Generated placeholder images');
};

// Main function to generate all assets
export const generateAllImageAssets = async () => {
  console.log('Generating all image assets...');
  
  await generateOGImages();
  await generateFavicons();
  await generatePlaceholderImages();
  
  console.log('✅ All image assets generated successfully!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Run ./generate-og-images.sh to create OG images (requires puppeteer)');
  console.log('2. Run ./generate-favicons.sh to create favicons (requires ImageMagick)');
  console.log('3. Replace placeholder images with actual photos');
  console.log('4. Optimize images for production using tools like ImageOptim or TinyPNG');
};

// For CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllImageAssets().catch(console.error);
}

export default {
  generateOGImages,
  generateFavicons,
  generatePlaceholderImages,
  generateAllImageAssets
};
