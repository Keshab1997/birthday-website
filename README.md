# Birthday Website 🎂

A beautiful, interactive quest-based birthday website with admin panel.

## 🎮 Features

- 🔒 **Lock Screen** - Secret code to unlock
- 🎨 **Hero Section** - Dynamic welcome message
- 💕 **Love Quiz** - Test relationship knowledge
- 🎮 **Memory Game** - Interactive card matching
- 📅 **Timeline** - Journey of your relationship
- 🖼️ **Gallery** - Photo memories
- 🌟 **Bucket List** - Future dreams together
- 💌 **Messages** - Love notes
- 🎁 **Gift Box** - Virtual surprise reveal
- 🎂 **Cake Cutting** - Interactive with confetti
- 🎵 **Background Music** - Different music per level
- 🔐 **Admin Panel** - Full content management

## 🚀 Quick Start

### 1. Supabase Setup
1. Create account at [Supabase](https://supabase.com)
2. Create new project
3. Copy URL and Anon Key
4. Update `assets/js/supabase-config.js`
5. Run `database-setup.sql` in SQL Editor
6. Create admin user in Authentication

### 2. Admin Panel
1. Open `admin.html`
2. Login with Supabase credentials
3. Add content to all sections

### 3. Deploy
- **Netlify**: Drag & drop folder → Get link
- **Vercel**: Import project → Deploy
- **GitHub Pages**: Upload → Enable Pages

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 📁 Structure

```
birthday-website/
├── index.html              # Main page
├── admin.html              # Admin panel
├── database-setup.sql      # Database schema
├── DEPLOYMENT.md           # Deployment guide
├── SETUP-CHECKLIST.md      # Setup steps
├── assets/
│   ├── css/global.css
│   ├── js/
│   │   ├── supabase-config.js
│   │   └── auth.js
│   └── music/              # Background music
├── admin-panel/
│   ├── admin-style.css
│   └── admin-script.js
└── sections/
    ├── 00-lock/            # Lock screen
    ├── 01-hero/            # Hero section
    ├── 02-timeline/        # Timeline
    ├── 03-gallery/         # Gallery
    ├── 04-messages/        # Messages
    ├── 05-cake/            # Cake cutting
    ├── 06-memory-game/     # Memory game
    ├── 07-quiz/            # Love quiz
    ├── 08-bucket/          # Bucket list
    └── 09-gift/            # Virtual gift box
```

## 🎯 Quest Flow

1. Lock Screen (Secret Code)
2. Hero Section (Welcome)
3. Love Quiz (Challenge 1)
4. Memory Game (Challenge 2)
5. Timeline (Journey)
6. Gallery (Photos)
7. Bucket List (Future Plans)
8. Messages (Love Notes)
9. Gift Box (Surprise)
10. Cake Cutting (Finale)

## 💻 Technologies

- HTML5, CSS3, JavaScript (ES6)
- Supabase (Backend)
- ImgBB (Image Hosting)
- Canvas Confetti (Animations)

## 📝 Configuration

### Secret Code
Default: `1205`
Change in: Admin Panel → Settings

### ImgBB API Key
Get free key: [ImgBB API](https://api.imgbb.com/)
Update: `admin-panel/admin-script.js`

## 🎵 Background Music

1. Download romantic song (MP3)
2. Rename to `romantic-track.mp3`
3. Place in `assets/music/`

Free music: [Pixabay](https://pixabay.com/music/)

## 🔧 Troubleshooting

**Data not loading?**
- Check Supabase credentials
- Verify tables have data
- Check browser console (F12)

**Music not playing?**
- User must click once first
- Check file path

**Images not loading?**
- Use ImgBB URLs
- Upload via admin panel

## 📱 Mobile Support

Fully responsive design.
Test on mobile after deployment.

## 🎁 Sharing

```
Hey Love! 🎂
I made something special for you.
Open: [YOUR_LINK]
Hint: Our special date (DDMM) 💕
```

---

Made with ❤️ for someone special
