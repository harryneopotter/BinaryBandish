async function loadVideos() {
  const grid = document.getElementById('tracksGrid');
  if (!grid) return;

  try {
    const res = await fetch('./videos.json', { cache: 'no-store' });
    const data = await res.json();
    const videos = data.videos || [];

    grid.innerHTML = videos.map(v => `
      <div class="card">
        <div class="player">
          <iframe
            src="https://www.youtube-nocookie.com/embed/${v.videoId}?rel=0"
            title="${v.title}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
        <div class="card-body">
          <h3 class="card-title">${v.title}</h3>
          <p class="card-desc">${v.description.slice(0, 200)}...</p>
        </div>
      </div>
    `).join('');

  } catch (e) {
    grid.innerHTML = '<p>Unable to load videos.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadVideos);