// Run with: node scripts/update_videos.js
// Requires YT_API_KEY in environment variables

const fs = require("fs");
const fetch = global.fetch;

const API_KEY = process.env.YT_API_KEY;
const HANDLE = "@thebinarybandish";

if (!API_KEY) {
  console.error("Missing YT_API_KEY");
  process.exit(1);
}

async function run() {
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${HANDLE}&key=${API_KEY}`
  );
  const channelData = await channelRes.json();

  const uploadsId =
    channelData.items[0].contentDetails.relatedPlaylists.uploads;

  const videosRes = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=12&key=${API_KEY}`
  );

  const videosData = await videosRes.json();

  const videos = videosData.items.map(item => ({
    videoId: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    publishedAt: item.snippet.publishedAt
  }));

  fs.writeFileSync(
    "site/videos.json",
    JSON.stringify({
      channelHandle: HANDLE,
      generatedAt: new Date().toISOString(),
      videos
    }, null, 2)
  );

  console.log("videos.json updated");
}

run();
