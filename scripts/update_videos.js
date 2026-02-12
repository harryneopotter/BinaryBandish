// Run with: node scripts/update_videos.js
// Requires YT_API_KEY in environment variables

const fs = require("fs");

const API_KEY = process.env.YT_API_KEY;
if (!API_KEY) {
  console.error("Missing env var: YT_API_KEY");
  process.exit(1);
}

const HANDLE = "@thebinarybandish";
const SEED_VIDEO_ID = "jm-HpLfQRmE"; // <- from your link
const MAX_RESULTS = 12;

async function yt(url) {
  // Adding a Referer header helps bypass restrictions if the API key is 
  // limited to specific domains (like github.io).
  const res = await fetch(url, {
    headers: {
      "Referer": "https://thebinarybandish.github.io/"
    }
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = null; }

  if (!res.ok) {
    throw new Error(`YouTube API HTTP ${res.status}: ${text.slice(0, 400)}`);
  }
  return json ?? {};
}

async function getUploadsPlaylistIdViaHandle(handle) {
  // Try handle with @ first as it's the standard, then try without as fallback
  const candidates = [
    handle.startsWith("@") ? handle : `@${handle}`,
    handle.replace(/^@/, "")
  ];

  for (const h of candidates) {
    try {
      const url =
        "https://www.googleapis.com/youtube/v3/channels" +
        `?part=contentDetails,snippet` +
        `&forHandle=${encodeURIComponent(h)}` +
        `&key=${encodeURIComponent(API_KEY)}`;

      const data = await yt(url);
      const item = data?.items?.[0];
      const uploads = item?.contentDetails?.relatedPlaylists?.uploads;

      if (uploads) {
        return {
          uploadsPlaylistId: uploads,
          channelTitle: item?.snippet?.title || "The Binary Bandish",
          resolvedBy: `forHandle=${h}`
        };
      }
    } catch (e) {
      console.warn(`[Info] forHandle=${h} failed: ${e.message.split(":")[0]}`);
    }
  }

  return null;
}

async function getChannelIdFromSeedVideo(videoId) {
  // videos.list with part=snippet includes snippet.channelId. :contentReference[oaicite:3]{index=3}
  const url =
    "https://www.googleapis.com/youtube/v3/videos" +
    `?part=snippet` +
    `&id=${encodeURIComponent(videoId)}` +
    `&key=${encodeURIComponent(API_KEY)}`;

  const data = await yt(url);
  const channelId = data?.items?.[0]?.snippet?.channelId;
  const channelTitle = data?.items?.[0]?.snippet?.channelTitle;

  if (!channelId) {
    throw new Error("Fallback failed: could not resolve channelId from seed video.");
  }

  return { channelId, channelTitle };
}

async function getUploadsPlaylistIdByChannelId(channelId) {
  const url =
    "https://www.googleapis.com/youtube/v3/channels" +
    `?part=contentDetails,snippet` +
    `&id=${encodeURIComponent(channelId)}` +
    `&key=${encodeURIComponent(API_KEY)}`;

  const data = await yt(url);
  const item = data?.items?.[0];
  const uploads = item?.contentDetails?.relatedPlaylists?.uploads;

  if (!uploads) {
    throw new Error("Could not resolve uploads playlist from channelId.");
  }

  return {
    uploadsPlaylistId: uploads,
    channelTitle: item?.snippet?.title || "The Binary Bandish",
    resolvedBy: `channelId=${channelId}`
  };
}

async function getLatestUploads(uploadsPlaylistId) {
  const url =
    "https://www.googleapis.com/youtube/v3/playlistItems" +
    `?part=snippet` +
    `&playlistId=${encodeURIComponent(uploadsPlaylistId)}` +
    `&maxResults=${MAX_RESULTS}` +
    `&key=${encodeURIComponent(API_KEY)}`;

  const data = await yt(url);
  const items = Array.isArray(data?.items) ? data.items : [];

  return items
    .map((it) => {
      const sn = it?.snippet;
      const vid = sn?.resourceId?.videoId;
      if (!vid) return null;

      return {
        videoId: vid,
        title: sn?.title || "",
        description: sn?.description || "",
        publishedAt: sn?.publishedAt || "",
        thumbnails: sn?.thumbnails || {}
      };
    })
    .filter(Boolean);
}

(async function run() {
  // 1) Try handle first
  let resolved = await getUploadsPlaylistIdViaHandle(HANDLE);

  // 2) Fallback to seed video -> channelId
  if (!resolved) {
    const { channelId } = await getChannelIdFromSeedVideo(SEED_VIDEO_ID);
    resolved = await getUploadsPlaylistIdByChannelId(channelId);
  }

  const videos = await getLatestUploads(resolved.uploadsPlaylistId);

  const payload = {
    channelHandle: HANDLE,
    resolvedBy: resolved.resolvedBy,
    channelTitle: resolved.channelTitle,
    generatedAt: new Date().toISOString(),
    videos
  };

  fs.writeFileSync("site/videos.json", JSON.stringify(payload, null, 2), "utf8");
  console.log(`videos.json updated: ${videos.length} videos (${resolved.resolvedBy})`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
