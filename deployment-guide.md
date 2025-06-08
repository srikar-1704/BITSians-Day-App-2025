# 🌍 Global Alumni Events App - Complete Setup & Deployment Guide

This guide will help you deploy your alumni events map app with minimal coding experience required. **Now using Mapbox for much cheaper mapping costs!**

## 📋 Prerequisites

Before starting, you'll need:
- A Google account
- A Google Sheet with your event data
- A Mapbox account (free tier: 50,000 map loads/month)
- A GitHub account (for deployment)

## 🗂️ Step 1: Prepare Your Google Sheet

### 1.1 Create Your Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Alumni Events" or similar
4. Add these exact column headers in row 1:
   ```
   City | Organizer | Email | Phone | GEOGRAPHY | Time and Date of the event | Venue Details | Registration Link | Other details
   ```

### 1.2 Add Your Event Data
Fill in your events data. Here's an example:
```
New York | John Smith | john@email.com | +1-555-0123 | North America | March 15, 2024 7:00 PM | Central Park Cafe | https://eventbrite.com/event123 | Networking dinner
London | Jane Doe | jane@email.com | +44-20-1234-5678 | Europe | March 20, 2024 6:30 PM | The London Eye | https://eventbrite.com/event456 | Alumni mixer
```

### 1.3 Make Your Sheet Public
1. Click "Share" button (top right)
2. Click "Change to anyone with the link"
3. Set permission to "Viewer"
4. Copy the share link - you'll need the Sheet ID from this URL

### 1.4 Get Your Sheet ID
From your share link: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
Copy the `SHEET_ID_HERE` part - this is your Google Sheet ID.

## 🗺️ Step 2: Get Mapbox Access Token (FREE & Better than Google Maps!)

### 2.1 Create Mapbox Account
1. Go to [Mapbox](https://www.mapbox.com)
2. Click "Sign up" (it's free!)
3. Verify your email
4. Complete the onboarding

### 2.2 Get Your Access Token
1. Go to your [Mapbox Account page](https://account.mapbox.com)
2. Scroll down to "Access tokens"
3. Copy your "Default public token" (starts with `pk.`)
4. This token allows 50,000 free map loads per month!

### 2.3 Optional: Create a Custom Token
1. Click "Create a token"
2. Name it "Alumni Events App"
3. Keep default scopes selected
4. Add your website URL under "URL restrictions" for security
5. Click "Create token"

## 💻 Step 3: Update Your Code

### 3.1 Update Google Sheet ID
In the file `src/hooks/useEvents.ts`, replace:
```typescript
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
```
with:
```typescript
const SHEET_ID = 'your_actual_sheet_id_here';
```

### 3.2 Add Mapbox Access Token
In the file `src/components/EventMap.tsx`, replace:
```typescript
window.mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN_HERE';
```
with:
```typescript
window.mapboxgl.accessToken = 'pk.your_actual_mapbox_token_here';
```

## 🚀 Step 4: Deploy to Vercel (Recommended)

### 4.1 Prepare for Deployment
1. Create a [GitHub](https://github.com) account if you don't have one
2. Download [GitHub Desktop](https://desktop.github.com) or use the web interface

### 4.2 Upload Your Code to GitHub
1. Create a new repository on GitHub
2. Name it "alumni-events-map"
3. Upload all your project files to this repository

### 4.3 Deploy with Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up with your GitHub account
3. Click "New Project"
4. Import your "alumni-events-map" repository
5. Vercel will automatically detect it's a Vite project
6. Click "Deploy"
7. Wait for deployment to complete (usually 2-3 minutes)

### 4.4 Your App is Live!
Vercel will give you a URL like: `https://alumni-events-map.vercel.app`

## 🌐 Step 5: Add Custom Domain (Optional)

### 5.1 Buy a Domain
Purchase a domain from:
- [Namecheap](https://namecheap.com) (recommended for beginners)
- [Cloudflare](https://www.cloudflare.com/products/registrar/) (cheapest)
- [GoDaddy](https://godaddy.com)

### 5.2 Connect Domain to Vercel
1. In your Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to update your domain's DNS settings
5. Wait 24-48 hours for DNS propagation

## 🔧 Step 6: Customize Your App

### 6.1 Change App Title
In `src/pages/Index.tsx`, update:
```typescript
<h1 className="text-2xl font-bold text-gray-900">
  Your Alumni Network Events  // Change this
</h1>
```

### 6.2 Update Geography Colors
In `src/types/Event.ts`, customize the colors:
```typescript
export const GEOGRAPHY_COLORS: GeographyColors = {
  'North America': '#FF6B6B',    // Red
  'Europe': '#45B7D1',           // Blue
  'Asia': '#96CEB4',             // Green
  'South America': '#4ECDC4',    // Teal
  'Africa': '#FFEAA7',           // Yellow
  'Oceania': '#DDA0DD',          // Purple
  'Middle East': '#FFB347',      // Orange
  // Add your regions and preferred colors
};
```

### 6.3 Change Map Style
In `src/components/EventMap.tsx`, you can change the map style:
```typescript
style: 'mapbox://styles/mapbox/light-v11', // Current: Light theme

// Other options:
// 'mapbox://styles/mapbox/streets-v12'     // Street map
// 'mapbox://styles/mapbox/outdoors-v12'   // Outdoor/terrain
// 'mapbox://styles/mapbox/satellite-v9'   // Satellite
// 'mapbox://styles/mapbox/dark-v11'       // Dark theme
```

## 🔄 Step 7: Update Your Events

### 7.1 Add New Events
1. Simply add new rows to your Google Sheet
2. Your app will automatically fetch the latest data
3. No redeployment needed!

### 7.2 Modify Existing Events
1. Edit any cell in your Google Sheet
2. Changes appear in your app within minutes

## 🛠️ Alternative: Deploy to Replit

### 7.1 Upload to Replit
1. Go to [Replit](https://replit.com)
2. Create account
3. Click "Create Repl"
4. Choose "Import from GitHub"
5. Enter your GitHub repository URL
6. Replit will automatically set up your project

### 7.2 Configure Replit
1. Replit should auto-detect the Vite setup
2. Click "Run" to start your app
3. Your app will be available at a Replit URL

### 7.3 Custom Domain on Replit
1. Upgrade to Replit Pro (paid)
2. Go to your Repl settings
3. Add your custom domain
4. Follow DNS setup instructions

## 💰 Cost Comparison

### Mapbox vs Google Maps:
- **Mapbox**: 50,000 free map loads/month, then $5 per 1,000 loads
- **Google Maps**: 28,000 free map loads/month, then $7 per 1,000 loads
- **Winner**: Mapbox is cheaper and more generous!

### Geocoding (Converting city names to coordinates):
- **OpenStreetMap Nominatim**: Completely FREE (used in this app)
- **Mapbox Geocoding**: 100,000 free requests/month
- **Google Geocoding**: 40,000 free requests/month

## 🆘 Troubleshooting

### Common Issues:

**Map not loading:**
- Check your Mapbox access token
- Ensure token is public (starts with `pk.`)
- Verify token hasn't expired

**No events showing:**
- Verify Google Sheet ID is correct
- Check that sheet is publicly accessible
- Ensure column headers match exactly

**Geocoding errors:**
- Some city names might not be recognized
- Try using "City, Country" format (e.g., "Paris, France")
- Check browser console for specific errors

**Deployment fails:**
- Ensure all files are uploaded to GitHub
- Check that package.json is included
- Verify no syntax errors in your code

**Rate limiting errors:**
- The app includes automatic rate limiting for geocoding
- If you have many events, initial load might be slow
- Consider pre-geocoding coordinates for better performance

## 📞 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all tokens and IDs are correct
3. Ensure your Google Sheet is publicly accessible
4. Test with a small dataset first

## 🎉 You're Done!

Your alumni events map should now be live and automatically updating from your Google Sheet. The Mapbox integration provides:

- ✅ **Beautiful 3D globe view**
- ✅ **50,000 free map loads/month**
- ✅ **Smooth animations and interactions**
- ✅ **Mobile-responsive design**
- ✅ **Professional appearance**

## 💡 Pro Tips

1. **Test with sample data first** before adding all your events
2. **Use consistent city naming** (e.g., "New York, USA" instead of just "New York")
3. **Monitor your Mapbox usage** in the dashboard
4. **Consider caching geocoded coordinates** for better performance
5. **Use the satellite view** for outdoor events
6. **Customize map colors** to match your organization's branding

## 🔒 Security Notes

- Mapbox public tokens are safe to use in client-side code
- Never share your secret Mapbox tokens
- Consider adding URL restrictions to your tokens
- Keep your domain registration information private
- Regularly review your Mapbox usage dashboard

## 🌟 Advanced Features You Can Add

1. **Event filtering** by date or geography
2. **Search functionality** to find specific cities
3. **Event clustering** for cities with multiple events
4. **Custom map markers** with your organization's logo
5. **Export functionality** to download event lists
6. **Admin panel** to manage events directly in the app

---

**Need help?** The app includes comprehensive error handling and user-friendly messages. Most issues are related to API tokens or Google Sheet accessibility.

**Mapbox Resources:**
- [Mapbox Documentation](https://docs.mapbox.com/)
- [Mapbox Studio](https://studio.mapbox.com/) - Create custom map styles
- [Mapbox Pricing](https://www.mapbox.com/pricing/) - Track your usage