# 🔧 Troubleshooting Guide

## Memory Game Images Not Showing

### Check 1: Browser Console
1. Press F12 to open Developer Tools
2. Go to Console tab
3. Look for errors or messages like:
   - "Using uploaded images: X"
   - "Using emojis, only found: X images"

### Check 2: Supabase Data
1. Go to Supabase Dashboard
2. Open Table Editor
3. Check `memory_game` table
4. Verify:
   - At least 6 rows exist
   - `image_url` column has valid URLs
   - URLs are accessible (click to test)

### Check 3: RLS Policies
1. Supabase Dashboard → Authentication → Policies
2. Ensure `memory_game` table has:
   - "Allow public read access" policy
3. If not, run this SQL:
```sql
CREATE POLICY "Allow public read access" ON memory_game FOR SELECT USING (true);
```

### Check 4: Image URLs
1. Admin Panel → Memory Game tab
2. Click on an image URL
3. Should open in new tab
4. If 404 error, re-upload image

### Check 5: Clear Cache
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Or clear browser cache

## Data Not Loading in Admin Panel

### Solution:
1. Check browser console for errors
2. Verify Supabase credentials in `assets/js/supabase-config.js`
3. Check if you're logged in (session active)

## Images Not Uploading

### Check:
1. ImgBB API key is correct in `admin-panel/admin-script.js`
2. File size under 32MB
3. File format is JPG/PNG/GIF
4. Internet connection stable

## Music Not Playing

### Solution:
1. User must click/interact first (browser policy)
2. Check file exists: `assets/music/romantic-track.mp3`
3. Check file format is MP3
4. Check browser console for errors

## Deployment Issues

### Netlify/Vercel:
1. Ensure all files uploaded
2. Check build logs for errors
3. Verify environment variables (if any)

### GitHub Pages:
1. Enable Pages in repo settings
2. Select correct branch
3. Wait 2-3 minutes for deployment

## Still Having Issues?

1. Check all files exist in correct folders
2. Run `database-setup.sql` again
3. Clear browser cache completely
4. Try different browser
5. Check Supabase project is active (not paused)

## Quick Test Commands

### Test Supabase Connection:
Open browser console on your site and run:
```javascript
window._supabase.from('memory_game').select('*').then(console.log)
```

Should show your data or error message.
