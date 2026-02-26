# 🎵 Section-wise Music Setup Guide

## Music Files Needed

Place these files in `assets/music/` folder:

1. `romantic-track.mp3` - Default background music
2. `lock-theme.mp3` - Lock screen music (optional)
3. `hero-theme.mp3` - Hero section music (optional)
4. `game-theme.mp3` - Memory game music (optional)
5. `memories-theme.mp3` - Timeline/Gallery music (optional)
6. `birthday-song.mp3` - Cake section music (optional)

## Free Music Sources

- [Pixabay Music](https://pixabay.com/music/) - Free, no attribution
- [Free Music Archive](https://freemusicarchive.org/)
- [YouTube Audio Library](https://www.youtube.com/audiolibrary)
- [Incompetech](https://incompetech.com/music/)

## How to Add Section-wise Music

### Option 1: Simple (One music for all)
Current setup - `romantic-track.mp3` plays throughout

### Option 2: Advanced (Different music per section)

Add this to `index.html` after the audio tag:

```javascript
const musicTracks = {
    'lock-screen': 'assets/music/lock-theme.mp3',
    'hero-section': 'assets/music/hero-theme.mp3',
    'memory-game-section': 'assets/music/game-theme.mp3',
    'timeline-section': 'assets/music/memories-theme.mp3',
    'cake-section': 'assets/music/birthday-song.mp3'
};

function playSectionMusic(sectionId) {
    const audio = document.getElementById('bg-music');
    const track = musicTracks[sectionId];
    if (track) {
        audio.src = track;
        audio.play().catch(e => console.log('Music blocked'));
    }
}

// Update navigation functions to change music
window.checkCode = function() {
    const code = document.getElementById('secret-code').value;
    if(code === '1205') {
        document.getElementById('lock-screen').style.display = 'none';
        document.getElementById('hero-section').style.display = 'block';
        playSectionMusic('hero-section'); // Change music
    }
};
```

## Tips

- Keep music files under 5MB for faster loading
- Use MP3 format (best browser support)
- Test volume levels (normalize audio)
- Consider adding a mute button for user control

## Recommended Songs

**Lock Screen**: Soft piano/ambient
**Hero**: Romantic instrumental
**Memory Game**: Upbeat, playful
**Timeline/Gallery**: Emotional, nostalgic
**Cake**: Happy Birthday song or celebration music
