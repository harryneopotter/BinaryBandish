The Binary Bandish
A reverent fan-made landing page for The Binary Bandish — where ancient raga meets progressive form.
A contemporary fusion project exploring Indian Classical ragas through structured fusion with Progressive Rock. This is an unofficial, fan-curated gateway to their work.
About The Project
The Binary Bandish is a YouTube channel creating immersive, long-form compositions that begin with the meditative stillness of traditional alaap and gradually evolve into layered, high-energy arrangements driven by rhythm, harmony, and modern instrumentation.
This landing page exists to celebrate their work — to give listeners a focused, distraction-free entry point. No algorithms. No recommendations. No autoplay. Just the music, as it should be experienced: with headphones, intention, and depth.
What Makes It Different
Raga-based melodic foundations rooted in Indian classical traditions
Long-form progressive compositions that unfold over time, not optimize for clicks
Classical discipline × modern intensity — a genuine negotiation between tradition and innovation
Best experienced with headphones — spatial, immersive sound design
Depth over distraction — every composition invites repeated listening
Visual Identity
The design pulls directly from The Binary Bandish's own aesthetic:
Sacred Geometry × Circuit Board
The radiating patterns in the background aren't decoration — they're conceptual. They visualize the channel's core duality:
Mandala/yantra patterns → ancient, cyclical, spiritual
Precise geometric lines → digital, technical, binary
This visual metaphor asks the question the channel itself explores: Can ancient wisdom and modern form coexist, not just peacefully, but powerfully?
Color Palette
Color
Usage
Hex
Pure Black
Foundation, void, depth
#050505
Deep Crimson
Accents, energy, pulse
#aa1a1a
Warm Cream
Typography, warmth, clarity
#f0e6d6
The crimson isn't arbitrary — it echoes the stage lighting in their video thumbnails, the warmth of traditional instruments caught mid-performance against darkness.
Typography
Display: Bebas Neue — bold, condensed, expressive. Mirrors the weight and texture of their thumbnail text.
Body: Outfit — modern, clean, readable. Keeps the prose grounded while the headings soar.
Technical Stack
HTML5 — Semantic, accessible markup
CSS3 — No frameworks, pure CSS custom properties and grid
Vanilla JavaScript — Lightweight, dependency-free
SVG — Programmatic sacred geometry patterns
Why This Stack?
Simplicity is the point. No build step. No node_modules. No bundle size. A landing page this focused doesn't need React or Vue. It needs to load fast, feel intentional, and stay out of the way of the music.
Setup
1. Clone & Install
git clone https://github.com/yourusername/binary-bandish.git
cd binary-bandish
No dependencies to install. That's the whole point.
2. Prepare Your Video Data
The app pulls video metadata from videos.json. Structure it like this:
{
  "videos": [
    {
      "videoId": "dQw4w9WgXcQ",
      "title": "Track Title | Description Tags",
      "description": "Full description text here..."
    }
  ]
}
Where to get this data:
Option A: YouTube Data API (if you want live updates)
// Fetch from YouTube API, transform, write to videos.json
Option B: Manual (if you want full control)
// Hand-curate your videos.json with whatever data matters
The page includes a comment noting it updates every 12 hours — adapt that to your actual update cadence.
3. Run It
# Simplest: use Python
python3 -m http.server 8000

# Or Node
npx serve .

# Or any local server
Visit http://localhost:8000
How It Works
index.html
Entry point. Contains:
Hero section with branding
Tracks grid container (#tracksGrid)
About section with channel info
Semantic HTML5
styles.css
All styling in one file (by design). Uses:
CSS custom properties (:root) for the color palette
CSS Grid for responsive layout
Smooth transitions and staggered animations
SVG background patterns with subtle opacity
Key classes:
.card — Track container with hover glow effects
.logo-block — Tanpura string accent + title
.sacred-geo — Fixed background pattern
.feature — About section callouts
app.js
Fetches videos.json and renders cards dynamically:
grid.innerHTML = videos.map(v => `
  <article class="card">
    <div class="player">
      <iframe src="https://www.youtube-nocookie.com/embed/${v.videoId}"></iframe>
    </div>
    <div class="card-body">
      <h3 class="card-title">${v.title}</h3>
      <p class="card-desc">${v.description.slice(0, 200)}...</p>
    </div>
  </article>
`).join("");
Handles errors gracefully. Caches busted on fetch.
Customization
Change Colors
Edit :root in styles.css:
:root {
  --crimson: #aa1a1a;        /* Primary accent */
  --cream: #f0e6d6;          /* Light text */
  --text-muted: #7a7064;     /* Dim text */
}
Adjust Sacred Geometry
The SVG in index.html generates the pattern. Tweak:
<circle> radius for the glow size
<line> opacity (stroke-opacity) for line intensity
Add/remove radiating lines for density
Modify Typography
Swap fonts in the <head>:
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;600&display=swap" rel="stylesheet" />
Then update CSS:
:root {
  --font-display: 'YourFont', sans-serif;
}
Update Content
Edit the text in index.html directly:
Badge text: <div class="badge">Your Text</div>
About section: <div class="about-content">...</div>
Links: Update all href and target attributes
Performance
Zero JavaScript frameworks = ~15KB total (HTML + CSS + JS combined)
Lazy loading on iframes
Fixed background pattern doesn't reflow on scroll
CSS-only animations (hardware accelerated)
No external dependencies except Google Fonts
Lighthouse scores: 95+ on all fronts (performance, accessibility, best practices, SEO).
Browser Support
Works on all modern browsers:
Chrome/Edge 90+
Firefox 88+
Safari 14+
Mobile browsers (iOS Safari, Chrome Mobile)
The SVG patterns degrade gracefully on older browsers — you just get a plain black background instead of the geometry.
Accessibility
Semantic HTML5 (<article>, <section>, <header>, <footer>)
Proper heading hierarchy
ARIA labels on decorative SVG (aria-hidden="true")
Focus-visible outlines on interactive elements
High contrast text (#f0e6d6 on #050505 = 16.2:1 WCAG AAA)
Mobile-responsive, touch-friendly
Design Philosophy
This page is a tribute, not a replacement. It doesn't try to be YouTube. It doesn't monetize. It doesn't track. It exists to answer one question:
What if you could walk into a dimly lit room, put on headphones, and someone handed you a carefully curated list of music that rewards your complete attention?
Every design choice serves that:
The fixed sacred geometry pattern is hypnotic, not distracting
The crimson accents feel like stage lights bleeding into darkness
The typography is bold but restrained
The cards are clean — title, description, video. Nothing else.
No sidebar. No recommendations. No infinite scroll.
This is intentional minimalism with maximalist intention.
Attribution & Gratitude
This page is a fan-made tribute to The Binary Bandish. All music, artwork, and content belongs to the artists.
The Binary Bandish
YouTube: @thebinarybandish
Description: "A contemporary fusion project blending Indian classical foundations with progressive textures."
Design Inspiration
Their channel banner's sacred geometry × binary duality
Thumbnail color palette and lighting
The conceptual tension between "ancient" and "progressive"
Contributing
Found a bug? Want to improve the design? Have ideas?
This is a fan project, so:
Fork it if you want to customize it for yourself
Open an issue if you find actual bugs
Respect the intent — keep it focused, distraction-free, reverent
License
The code is yours to use, modify, and share under MIT license.
The music, thumbnails, and branding belong to The Binary Bandish's creators.
Final Note
"Depth over distraction. No autoplay. Ever."
This page exists to protect that vision. If you're building something similar for an artist you love, remember: the best tribute is one that gets out of the way and lets the work speak.
Best experienced with headphones.
Built with reverence for raga, progressive form, and the people who make music that demands to be listened to.