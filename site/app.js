
async function loadVideos() {
  const grid = document.getElementById("tracksGrid");

  try {
    const res = await fetch("./videos.json", { cache: "no-store" });
    const data = await res.json();
    const videos = data.videos || [];

    grid.innerHTML = videos.map(v => `
      <article class="card">
        <div class="player">
          <iframe
            src="https://www.youtube-nocookie.com/embed/${v.videoId}"
            allowfullscreen
          ></iframe>
        </div>
        <h3>${v.title}</h3>
        <p>${v.description.slice(0, 200)}...</p>
      </article>
    `).join("");

  } catch (e) {
    grid.innerHTML = "<p>Unable to load videos.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadVideos);
