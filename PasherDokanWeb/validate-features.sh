#!/bin/bash

# PasherDokan Website Feature Validation Script
# This script tests the implementation of all features and improvements

echo "🚀 PasherDokan Website Feature Validation"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
    fi
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Please run this script from the PasherDokanWeb directory.${NC}"
    exit 1
fi

echo ""
print_info "Checking project structure..."

# Check key files and directories
check_file_exists() {
    if [ -f "$1" ]; then
        print_status 0 "$1 exists"
        return 0
    else
        print_status 1 "$1 missing"
        return 1
    fi
}

check_dir_exists() {
    if [ -d "$1" ]; then
        print_status 0 "$1/ directory exists"
        return 0
    else
        print_status 1 "$1/ directory missing"
        return 1
    fi
}

echo ""
echo "📁 Project Structure Validation:"
echo "--------------------------------"

# Core files
check_file_exists "src/App.tsx"
check_file_exists "src/main.tsx"
check_file_exists "src/index.css"
check_file_exists "vite.config.ts"
check_file_exists "vite.config.performance.ts"
check_file_exists "tailwind.config.js"
check_file_exists "postcss.config.js"

# PWA files
echo ""
echo "📱 PWA Implementation:"
echo "---------------------"
check_file_exists "public/site.webmanifest"
check_file_exists "public/sw.js"
check_file_exists "src/hooks/usePWA.ts"
check_file_exists "src/components/PWAInstallPrompt.tsx"

# Accessibility files
echo ""
echo "♿ Accessibility Features:"
echo "-------------------------"
check_file_exists "src/contexts/AccessibilityContext.tsx"
check_file_exists "src/hooks/useA11y.ts"
check_file_exists "src/components/AccessibilityToolbar.tsx"
check_file_exists "src/styles/accessibility.css"

# Localization files
echo ""
echo "🌐 Localization System:"
echo "-----------------------"
check_file_exists "src/contexts/LanguageContext.tsx"
check_file_exists "src/components/LanguageToggle.tsx"
check_dir_exists "src/locales"

# Performance files
echo ""
echo "⚡ Performance Optimization:"
echo "---------------------------"
check_file_exists "src/hooks/usePerformanceMonitoring.ts"
check_file_exists "src/components/OptimizedImage.tsx"
check_file_exists "src/components/SocialProof.tsx"

# Component files
echo ""
echo "🧩 Core Components:"
echo "------------------"
check_file_exists "src/components/Header.tsx"
check_file_exists "src/components/Hero.tsx"
check_file_exists "src/components/Features.tsx"
check_file_exists "src/components/Testimonials.tsx"
check_file_exists "src/components/Team.tsx"
check_file_exists "src/components/FAQ.tsx"
check_file_exists "src/components/Footer.tsx"
check_file_exists "src/components/CallToAction.tsx"

echo ""
print_info "Installing dependencies..."

# Install dependencies
npm install > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_status 0 "Dependencies installed successfully"
else
    print_status 1 "Failed to install dependencies"
fi

echo ""
print_info "Running TypeScript compilation check..."

# Check TypeScript compilation
npx tsc --noEmit > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_status 0 "TypeScript compilation successful"
else
    print_status 1 "TypeScript compilation failed"
    print_warning "Run 'npx tsc --noEmit' to see detailed errors"
fi

echo ""
print_info "Running ESLint check..."

# Check ESLint
npx eslint src --ext .ts,.tsx > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_status 0 "ESLint passed"
else
    print_status 1 "ESLint found issues"
    print_warning "Run 'npx eslint src --ext .ts,.tsx' to see detailed issues"
fi

echo ""
print_info "Testing build process..."

# Test build
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_status 0 "Production build successful"
    
    # Check build output
    if [ -d "dist" ]; then
        print_status 0 "Build output directory created"
        
        # Check for key files in build
        if [ -f "dist/index.html" ]; then
            print_status 0 "index.html generated"
        else
            print_status 1 "index.html missing from build"
        fi
        
        if [ -f "dist/site.webmanifest" ]; then
            print_status 0 "PWA manifest included in build"
        else
            print_status 1 "PWA manifest missing from build"
        fi
        
        # Check bundle sizes
        JS_FILES=$(find dist -name "*.js" -type f)
        if [ ! -z "$JS_FILES" ]; then
            print_status 0 "JavaScript bundles generated"
            
            # Check for large bundles
            for file in $JS_FILES; do
                size=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null)
                if [ $size -gt 500000 ]; then  # 500KB
                    print_warning "Large bundle detected: $file ($(echo "scale=1; $size/1024" | bc)KB)"
                fi
            done
        else
            print_status 1 "No JavaScript bundles found"
        fi
    else
        print_status 1 "Build output directory not created"
    fi
else
    print_status 1 "Production build failed"
    print_warning "Run 'npm run build' to see detailed build errors"
fi

echo ""
print_info "Checking service worker functionality..."

# Check service worker
if [ -f "public/sw.js" ]; then
    # Basic syntax check
    node -c "public/sw.js" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        print_status 0 "Service worker syntax valid"
    else
        print_status 1 "Service worker has syntax errors"
    fi
else
    print_status 1 "Service worker file missing"
fi

echo ""
print_info "Validating PWA manifest..."

# Check PWA manifest
if [ -f "public/site.webmanifest" ]; then
    # Basic JSON validation
    python3 -m json.tool "public/site.webmanifest" > /dev/null 2>&1 || node -e "JSON.parse(require('fs').readFileSync('public/site.webmanifest', 'utf8'))" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        print_status 0 "PWA manifest is valid JSON"
    else
        print_status 1 "PWA manifest has invalid JSON"
    fi
else
    print_status 1 "PWA manifest file missing"
fi

echo ""
print_info "Feature Implementation Summary:"
echo "==============================="

# Count implemented features
TOTAL_FEATURES=0
IMPLEMENTED_FEATURES=0

# PWA Features
echo ""
echo "📱 Progressive Web App:"
TOTAL_FEATURES=$((TOTAL_FEATURES + 4))
[ -f "public/site.webmanifest" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))
[ -f "public/sw.js" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))
[ -f "src/hooks/usePWA.ts" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))
[ -f "src/components/PWAInstallPrompt.tsx" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))

echo "   - Web App Manifest: $([ -f "public/site.webmanifest" ] && echo "✓" || echo "✗")"
echo "   - Service Worker: $([ -f "public/sw.js" ] && echo "✓" || echo "✗")"
echo "   - PWA Hook: $([ -f "src/hooks/usePWA.ts" ] && echo "✓" || echo "✗")"
echo "   - Install Prompt: $([ -f "src/components/PWAInstallPrompt.tsx" ] && echo "✓" || echo "✗")"

# Accessibility Features
echo ""
echo "♿ Accessibility:"
TOTAL_FEATURES=$((TOTAL_FEATURES + 4))
[ -f "src/contexts/AccessibilityContext.tsx" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))
[ -f "src/hooks/useA11y.ts" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))
[ -f "src/components/AccessibilityToolbar.tsx" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))
[ -f "src/styles/accessibility.css" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))

echo "   - Accessibility Context: $([ -f "src/contexts/AccessibilityContext.tsx" ] && echo "✓" || echo "✗")"
echo "   - A11y Hook: $([ -f "src/hooks/useA11y.ts" ] && echo "✓" || echo "✗")"
echo "   - Accessibility Toolbar: $([ -f "src/components/AccessibilityToolbar.tsx" ] && echo "✓" || echo "✗")"
echo "   - A11y Styles: $([ -f "src/styles/accessibility.css" ] && echo "✓" || echo "✗")"

# Localization Features
echo ""
echo "🌐 Localization:"
TOTAL_FEATURES=$((TOTAL_FEATURES + 3))
[ -f "src/contexts/LanguageContext.tsx" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))
[ -f "src/components/LanguageToggle.tsx" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))
[ -d "src/locales" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))

echo "   - Language Context: $([ -f "src/contexts/LanguageContext.tsx" ] && echo "✓" || echo "✗")"
echo "   - Language Toggle: $([ -f "src/components/LanguageToggle.tsx" ] && echo "✓" || echo "✗")"
echo "   - Locale Files: $([ -d "src/locales" ] && echo "✓" || echo "✗")"

# Performance Features
echo ""
echo "⚡ Performance:"
TOTAL_FEATURES=$((TOTAL_FEATURES + 4))
[ -f "src/hooks/usePerformanceMonitoring.ts" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))
[ -f "src/components/OptimizedImage.tsx" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))
[ -f "vite.config.performance.ts" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))
[ -f "src/components/SocialProof.tsx" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))

echo "   - Performance Monitoring: $([ -f "src/hooks/usePerformanceMonitoring.ts" ] && echo "✓" || echo "✗")"
echo "   - Optimized Images: $([ -f "src/components/OptimizedImage.tsx" ] && echo "✓" || echo "✗")"
echo "   - Performance Config: $([ -f "vite.config.performance.ts" ] && echo "✓" || echo "✗")"
echo "   - Social Proof: $([ -f "src/components/SocialProof.tsx" ] && echo "✓" || echo "✗")"

# Mobile Features
echo ""
echo "📱 Mobile Experience:"
TOTAL_FEATURES=$((TOTAL_FEATURES + 2))
[ -f "src/hooks/useTouchGestures.ts" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))
[ -f "src/components/TouchCarousel.tsx" ] && IMPLEMENTED_FEATURES=$((IMPLEMENTED_FEATURES + 1))

echo "   - Touch Gestures: $([ -f "src/hooks/useTouchGestures.ts" ] && echo "✓" || echo "✗")"
echo "   - Touch Carousel: $([ -f "src/components/TouchCarousel.tsx" ] && echo "✓" || echo "✗")"

echo ""
echo "📊 Implementation Progress:"
echo "============================"
PERCENTAGE=$((IMPLEMENTED_FEATURES * 100 / TOTAL_FEATURES))
echo "Features Implemented: $IMPLEMENTED_FEATURES/$TOTAL_FEATURES ($PERCENTAGE%)"

if [ $PERCENTAGE -ge 90 ]; then
    echo -e "${GREEN}🎉 Excellent! Nearly all features implemented.${NC}"
elif [ $PERCENTAGE -ge 75 ]; then
    echo -e "${YELLOW}👍 Good progress! Most features implemented.${NC}"
elif [ $PERCENTAGE -ge 50 ]; then
    echo -e "${YELLOW}⚠️  Fair progress. Several features still needed.${NC}"
else
    echo -e "${RED}❌ More work needed. Many features missing.${NC}"
fi

echo ""
print_info "Next Steps:"
echo "----------"
echo "1. 🚀 Start development server: npm run dev"
echo "2. 🏗️  Build for production: npm run build"
echo "3. 👀 Preview build: npm run preview"
echo "4. 🧪 Test accessibility features"
echo "5. 📱 Test PWA installation"
echo "6. 🌐 Test language switching"
echo "7. ⚡ Monitor performance metrics"

echo ""
echo -e "${GREEN}✅ Validation complete!${NC}"
