/* BOKEH BACKGROUND */
(function generateBokeh() {
    const bg = document.getElementById('bokehBg');
    if (!bg) return;
    
    const palette = [
        'rgba(212,175,140,', 'rgba(232,203,168,', 'rgba(201,160,85,',
        'rgba(196,132,138,', 'rgba(220,168,168,', 'rgba(240,220,196,',
        'rgba(184,149,110,', 'rgba(232,200,104,', 'rgba(208,164,164,'
    ];

    for (let i = 0; i < 45; i++) {
        const d = document.createElement('div');
        d.className = 'bokeh-fixed';
        const s = 30 + Math.random() * 240;
        const c = palette[Math.floor(Math.random() * palette.length)];
        const o = 0.02 + Math.random() * 0.06;
        Object.assign(d.style, {
            width: s + 'px', height: s + 'px',
            left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
            background: `radial-gradient(circle,${c}${o + 0.04}) 0%,${c}${o * 0.25}) 50%,transparent 70%)`,
            animationDuration: (4 + Math.random() * 7) + 's',
            animationDelay: Math.random() * 6 + 's',
            filter: `blur(${2 + Math.random() * 10}px)`
        });
        bg.appendChild(d);
    }

    for (let i = 0; i < 20; i++) {
        const d = document.createElement('div');
        d.className = 'bokeh-orb';
        const s = 20 + Math.random() * 140;
        const c = palette[Math.floor(Math.random() * palette.length)];
        const pk = 0.05 + Math.random() * 0.12;
        d.style.setProperty('--peak', pk);
        Object.assign(d.style, {
            width: s + 'px', height: s + 'px',
            left: Math.random() * 100 + '%', bottom: '-' + s + 'px',
            background: `radial-gradient(circle,${c}${pk}) 0%,${c}${pk * 0.25}) 60%,transparent 70%)`,
            animationDuration: (14 + Math.random() * 28) + 's',
            animationDelay: Math.random() * 18 + 's',
            filter: `blur(${3 + Math.random() * 12}px)`
        });
        bg.appendChild(d);
    }
})();

/* PIPING PEARLS */
(function generatePearls() {
    [
        { id: 'pearlsTop', n: 9 },
        { id: 'pearlsMid', n: 13 },
        { id: 'pearlsBot', n: 17 }
    ].forEach(({ id, n }) => {
        const wrap = document.getElementById(id);
        if (!wrap) return;
        for (let i = 0; i < n; i++) {
            const p = document.createElement('div');
            p.className = 'pearl';
            p.style.animationDelay = (i * 0.2) + 's';
            wrap.appendChild(p);
        }
    });
})();

/* AMBIENT FLOATING PARTICLES */
(function ambientParticles() {
    const tones = [
        'rgba(212,175,140,0.30)', 'rgba(196,132,138,0.24)',
        'rgba(201,160,85,0.28)', 'rgba(232,200,104,0.22)',
        'rgba(220,168,168,0.20)'
    ];
    setInterval(() => {
        const p = document.createElement('div');
        p.className = 'g-particle';
        const c = tones[Math.floor(Math.random() * tones.length)];
        const sz = (1.5 + Math.random() * 3) + 'px';
        Object.assign(p.style, {
            backgroundColor: c, width: sz, height: sz,
            left: Math.random() * 100 + '%', bottom: '0px',
            boxShadow: `0 0 6px ${c}`
        });
        document.body.appendChild(p);

        let y = window.innerHeight, x = parseFloat(p.style.left),
            sp = 0.3 + Math.random() * 0.8, sw = (Math.random() - 0.5) * 0.6, t = 0;

        (function step() {
            y -= sp; x += Math.sin(t * 0.018) * sw; t++;
            p.style.bottom = (window.innerHeight - y) + 'px';
            p.style.left = x + '%';
            const prog = (window.innerHeight - y) / window.innerHeight;
            p.style.opacity = Math.max(0, 0.4 * (1 - prog * 1.2));
            if (y > 0 && parseFloat(p.style.opacity) > 0) requestAnimationFrame(step);
            else p.remove();
        })();
    }, 850);
})();

/* GOLD DUST CONFETTI */
function launchDust() {
    const box = document.getElementById('confettiLayer');
    if (!box) return;
    
    const golds = [
        '#d4af8c','#c9a055','#b8956e','#e8c868','#f0dcc4',
        '#d4a07a','#c4956a','#deb896','#e0c8a8','#cba882',
        '#c48e8e','#dca8a8','#f0c8c8','#e8c4a0','#f5e6d7'
    ];
    for (let w = 0; w < 8; w++) {
        setTimeout(() => {
            for (let i = 0; i < 60; i++) {
                const d = document.createElement('div');
                d.className = 'dust';
                const col = golds[Math.floor(Math.random() * golds.length)];
                const sz = 2 + Math.random() * 6;
                const dr = (Math.random() - 0.5) * 180;
                d.style.setProperty('--drift', dr + 'px');
                Object.assign(d.style, {
                    left: Math.random() * 100 + '%',
                    width: sz + 'px', height: sz + 'px',
                    backgroundColor: col,
                    animationDuration: (3 + Math.random() * 4.5) + 's',
                    animationDelay: (Math.random() * 1) + 's',
                    boxShadow: `0 0 ${4 + Math.random() * 8}px ${col}`
                });
                const r = Math.random();
                d.style.borderRadius = r < 0.4 ? '50%' : r < 0.7 ? '1px' : '50% 0';
                box.appendChild(d);
                setTimeout(() => d.remove(), 9000);
            }
        }, w * 400);
    }
}

/* ELEGANT FIREWORK BURSTS */
function elegantBursts() {
    const hues = [
        '#d4af8c','#c9a055','#e8c868','#f0dcc4',
        '#deb896','#c48e8e','#dca8a8','#f5e6d7','#e8c4a0'
    ];
    for (let b = 0; b < 7; b++) {
        setTimeout(() => {
            const cx = 60 + Math.random() * (window.innerWidth - 120);
            const cy = 40 + Math.random() * (window.innerHeight * 0.4);
            for (let i = 0; i < 32; i++) {
                const s = document.createElement('div');
                const col = hues[Math.floor(Math.random() * hues.length)];
                const sz = 3 + Math.random() * 3;
                Object.assign(s.style, {
                    position: 'fixed', width: sz + 'px', height: sz + 'px',
                    borderRadius: '50%', left: cx + 'px', top: cy + 'px',
                    zIndex: 150, pointerEvents: 'none',
                    backgroundColor: col,
                    boxShadow: `0 0 8px ${col}, 0 0 20px ${col}`
                });
                document.body.appendChild(s);
                const a = (i / 32) * Math.PI * 2;
                const dist = 50 + Math.random() * 85;
                s.animate([
                    { left: cx + 'px', top: cy + 'px', opacity: 1, transform: 'scale(1)' },
                    { left: (cx + Math.cos(a) * dist) + 'px', top: (cy + Math.sin(a) * dist) + 'px', opacity: 0, transform: 'scale(0)' }
                ], { duration: 850 + Math.random() * 600, easing: 'cubic-bezier(0.25,0.46,0.45,0.94)', fill: 'forwards' });
                setTimeout(() => s.remove(), 1800);
            }
        }, b * 440);
    }
}

/* SPARKLE RINGS */
function sparkleRings() {
    const r1 = document.getElementById('ring1');
    const r2 = document.getElementById('ring2');
    if (r1) r1.classList.add('pop');
    if (r2) setTimeout(() => r2.classList.add('pop'), 350);
}

/* CUT THE CAKE */
let done = false;

function cutCake() {
    if (done) return;
    done = true;

    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
        bgMusic.src = 'assets/music/cake.mp3';
        bgMusic.play().catch(() => {});
    }

    const btn = document.getElementById('btn');
    if (btn) {
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
        btn.style.transition = 'opacity 0.3s';
    }

    const knife = document.getElementById('knife');
    if (knife) knife.classList.add('go');

    setTimeout(() => {
        document.querySelectorAll('#cake-section .flame-outer, #cake-section .flame-inner, #cake-section .flame-halo').forEach(el => {
            el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
            el.style.opacity = '0';
            if (el.classList.contains('flame-halo'))
                el.style.transform = 'translateX(-50%) scale(0)';
            else
                el.style.transform = 'scale(0)';
        });
        const cw = document.getElementById('cakeWrap');
        if (cw) {
            cw.classList.add('sliced');
            cw.style.transform = 'rotateX(8deg)';
        }
    }, 850);

    setTimeout(() => {
        sparkleRings();
        launchDust();
        setTimeout(() => {
            const msg = document.getElementById('msg');
            const notes = document.getElementById('notes');
            if (msg) msg.classList.add('reveal');
            if (notes) notes.classList.add('on');
            elegantBursts();
        }, 450);
    }, 1700);

    setTimeout(() => {
        const ts = document.querySelector('#cake-section .title-section');
        if (ts) {
            ts.style.transition = 'opacity 1s ease';
            ts.style.opacity = '0';
        }
    }, 2000);

    setTimeout(() => {
        const m = document.getElementById('msg');
        if (m) {
            m.style.transition = 'all 1.3s ease';
            m.style.fontSize = 'clamp(1.3rem,2.8vw,1.9rem)';
            m.style.top = '10%';
        }
    }, 6500);

    setTimeout(() => {
        if (btn) {
            btn.textContent = 'Celebrate Again';
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
            btn.onclick = () => location.reload();
        }
    }, 5500);
}

const cakeBtn = document.getElementById('btn');
if (cakeBtn) {
    cakeBtn.addEventListener('click', cutCake);
} else {
    setTimeout(() => {
        const retryBtn = document.getElementById('btn');
        if (retryBtn) retryBtn.addEventListener('click', cutCake);
    }, 500);
}

window.cutCake = cutCake;
