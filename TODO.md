# TODO List

## 1. Creating the Required Images

### For clean-mac-thumbnail.jpg:

This image will be used for social media sharing (Open Graph and Twitter Cards).

**Recommended dimensions**: 1200 x 630 pixels (optimal for social sharing)

**Content suggestions**:

- Include your site title "Step by Step Guide to Clean Your Mac"
- Add a visual representation of Mac cleaning (like a Mac with cleaning icons)
- Use your brand colors (#0b3d91)
- Keep text minimal and readable

**Tools to create the image**:

- [Canva](https://www.canva.com/) (free, web-based)
- [Figma](https://www.figma.com/) (free, web-based)
- Adobe Photoshop (paid): If you have access to it

### For apple-touch-icon.png:

This is the icon that appears when users add your site to their iOS home screen.

**Recommended dimensions**: 180 x 180 pixels
**Format**: PNG with transparency
**Content**: A simplified version of your logo or a Mac cleaning icon

**Tools to create the icon**:

- [Favicon.io](https://favicon.io/) (free)
- [RealFaviconGenerator](https://realfavicongenerator.net/) (free)
- Same tools as above (Canva, Figma, Photoshop)

## 2. Submitting Your Sitemap to Google Search Console

### Step-by-step guide:

1. **Verify your site ownership**:

   - Go to [Google Search Console](https://search.google.com/search-console)
   - Click "Add Property"
   - Enter your website URL: `https://jakub-horacek.github.io/step-by-step-clean-my-mac/`
   - Choose a verification method (HTML file, HTML meta tag, DNS record, or Google Analytics)
   - Follow the instructions to verify ownership

2. **Submit your sitemap**:

   - Once verified, go to your property dashboard
   - In the left sidebar, click on "Sitemaps"
   - Enter `sitemap.xml` in the "Add a new sitemap" field
   - Click "Submit"

3. **Monitor your sitemap status**:
   - Google will process your sitemap and show its status
   - It may take a few days for Google to fully index your pages
   - Check for any errors or warnings and fix them

### Additional tips:

- Make sure your sitemap is accessible at `https://jakub-horacek.github.io/step-by-step-clean-my-mac/sitemap.xml`
- If you're using GitHub Pages, ensure your repository settings are configured to serve the sitemap
- Consider adding a reference to your sitemap in your robots.txt file

## 3. Completed Tasks

- [x] Removed sitemap.xml from the codebase
- [x] Language alternates and other SEO elements remain in place
- [x] Search engines can still discover and index pages through normal crawling
