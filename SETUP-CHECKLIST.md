# 🎂 Birthday Website - Final Setup Checklist

## ✅ Step 1: Database Setup (Supabase)

1. Open Supabase SQL Editor
2. Run `database-setup.sql`
3. Create admin user in Authentication
4. Verify all tables created:
   - hero_section
   - timeline
   - gallery
   - messages

## ✅ Step 2: Admin Panel Setup

1. Open `admin.html`
2. Login with your Supabase credentials
3. Add content to each section:
   - **Hero**: Title, subtitle, background image
   - **Timeline**: At least 3 events
   - **Gallery**: 5-10 photos
   - **Messages**: 4-5 love messages
   - **Settings**: Set secret code (default: 1205)

## ✅ Step 3: Background Music (Optional)

1. Download a romantic song from:
   - Pixabay Music (free)
   - YouTube Audio Library
2. Convert to MP3 if needed
3. Rename to `romantic-track.mp3`
4. Place in `assets/music/` folder

## ✅ Step 4: Test Locally

1. Open `index.html` in browser
2. Test the quest flow:
   - Lock screen (enter code)
   - Hero section
   - Memory game
   - Timeline
   - Gallery
   - Messages
   - Cake cutting
3. Check mobile responsiveness

## ✅ Step 5: Deploy Online

### Netlify (Easiest):
1. Go to netlify.com
2. Drag & drop `birthday-website` folder
3. Get your link: `https://yoursite.netlify.app`

### Vercel:
1. Go to vercel.com
2. Import project
3. Deploy

### GitHub Pages:
1. Create GitHub repo
2. Upload files
3. Enable Pages in Settings

## ✅ Step 6: Share with Her

Send her the link with a message:
```
Hey Love! 🎂
I made something special for your birthday.
Open this: [YOUR_LINK]
Hint: Enter our special date (DDMM) 💕
```

## 🎮 Quest Flow:

1. **Lock Screen** → Enter secret code
2. **Hero Section** → Click "Start Your Journey"
3. **Memory Game** → Match all pairs
4. **Timeline** → View memories → Click "Continue"
5. **Gallery** → View photos → Click "Continue"
6. **Messages** → Read love notes → Click "Cake Time"
7. **Cake Cutting** → Blow candle → Confetti! 🎉

## 🔧 Common Issues:

**Data not showing?**
- Check Supabase credentials in `assets/js/supabase-config.js`
- Verify data exists in Supabase tables

**Music not playing?**
- User must click once (browser policy)
- Check file path is correct

**Images not loading?**
- Use ImgBB URLs (uploaded via admin panel)
- Don't use local file paths

## 📱 Mobile Testing:

After deployment, test on:
- iPhone Safari
- Android Chrome
- Check all buttons work
- Verify images load

---

**Your website is ready! 🎉**

Make her birthday unforgettable! ❤️
