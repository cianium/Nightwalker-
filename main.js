/* ===========================
   NIGHTWALKER HUB — main.js
   Static/GitHub Pages friendly
   =========================== */

const YT_CHANNEL_ID = 'UC45CXEkeiRpN4hq6lUYhDCQ';
const KICK_CHANNEL  = 'nightwalkerad';
const YT_RSS = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3D${YT_CHANNEL_ID}`;
const LIVE_CHECK_INTERVAL = 60_000;

let wasLive = false;
let hasCheckedLiveOnce = false;

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '';
  const now = new Date();
  const diff = Math.max(0, Math.floor((now - d) / 1000));
  if (diff < 3600)  return `${Math.floor(diff / 60)} دقیقه پیش`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ساعت پیش`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} روز پیش`;
  return d.toLocaleDateString('fa-IR');
}

function setLiveUI(isLive, streamTitle = '') {
  const card       = document.getElementById('live-card');
  const dot        = document.getElementById('avatar-live-dot');
  const indicator  = document.getElementById('live-indicator');
  const label      = document.getElementById('live-label');
  const statusText = document.getElementById('live-status-text');
  const watchBtn   = document.getElementById('live-watch-btn');

  if (!card) return;

  card.classList.toggle('is-live', isLive);
  dot?.classList.toggle('is-live', isLive);
  indicator?.classList.toggle('is-live', isLive);
  label?.classList.toggle('is-live', isLive);

  if (label) label.textContent = isLive ? 'LIVE' : 'OFFLINE';
  if (statusText) statusText.textContent = isLive ? (streamTitle || 'لایو هستم!') : 'فعلاً آفلاینم';
  if (watchBtn) watchBtn.style.display = isLive ? 'block' : '';
}

function notifyLive(streamTitle) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  try {
    new Notification('Nightwalker لایو شد! 🎮', {
      body: streamTitle || 'الان می‌تونی لایو رو ببینی.',
      icon: 'assets/images/profile.jpg',
      tag: 'nightwalker-live'
    });
  } catch {
    // Notification API can fail silently in some browsers/contexts.
  }
}

async function checkLiveStatus() {
  const card = document.getElementById('live-card');
  if (!card) return;

  try {
    const endpoint = `https://corsproxy.io/?url=${encodeURIComponent(`https://kick.com/api/v1/channels/${KICK_CHANNEL}`)}`;
    const res = await fetch(endpoint, {
      signal: AbortSignal.timeout(7000),
      cache: 'no-store'
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const livestream = data?.livestream;
    const isLive = livestream !== null && livestream !== undefined;
    const streamTitle = livestream?.session_title || 'لایو هستم!';

    setLiveUI(isLive, streamTitle);

    if (hasCheckedLiveOnce && !wasLive && isLive) notifyLive(streamTitle);
    wasLive = isLive;
    hasCheckedLiveOnce = true;
  } catch {
    // Preserve the last known state during a temporary API/proxy failure.
    if (!hasCheckedLiveOnce) setLiveUI(false);
  }
}

function extractYouTubeVideoId(url = '') {
  try {
    const parsed = new URL(url);
    return parsed.searchParams.get('v') || '';
  } catch {
    return '';
  }
}

function createVideoCard(video) {
  const url = video.link || '';
  const videoId = extractYouTubeVideoId(url);
  const thumb = video.thumbnail || (videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : '');
  const title = video.title || 'آخرین ویدیو';
  const date = formatDate(video.pubDate);

  const link = document.createElement('a');
  link.href = url || `https://www.youtube.com/@nightwalker_farsi`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'video-card';
  link.setAttribute('aria-label', `تماشای: ${title}`);

  const thumbWrap = document.createElement('div');
  thumbWrap.className = 'video-thumb-wrap';

  if (thumb) {
    const img = document.createElement('img');
    img.src = thumb;
    img.alt = title;
    img.loading = 'lazy';
    if (videoId) img.onerror = () => { img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`; };
    thumbWrap.appendChild(img);
  }

  const play = document.createElement('div');
  play.className = 'play-btn';
  play.setAttribute('aria-hidden', 'true');
  play.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="rgba(255,0,85,0.9)"/><polygon points="9.5,7 18,12 9.5,17" fill="white"/></svg>';
  thumbWrap.appendChild(play);

  const meta = document.createElement('div');
  meta.className = 'video-meta';
  const titleEl = document.createElement('div');
  titleEl.className = 'video-title';
  titleEl.textContent = title;
  const dateEl = document.createElement('div');
  dateEl.className = 'video-date';
  dateEl.textContent = date;
  meta.append(titleEl, dateEl);

  link.append(thumbWrap, meta);
  return link;
}

async function loadLatestVideo() {
  const container = document.getElementById('video-container');
  if (!container) return;

  try {
    const res = await fetch(YT_RSS, { signal: AbortSignal.timeout(7000), cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.status !== 'ok' || !Array.isArray(data.items) || !data.items.length) throw new Error('No videos');

    container.replaceChildren(createVideoCard(data.items[0]));
  } catch {
    const fallback = document.createElement('a');
    fallback.href = 'https://www.youtube.com/@nightwalker_farsi';
    fallback.target = '_blank';
    fallback.rel = 'noopener noreferrer';
    fallback.className = 'video-card';
    const text = document.createElement('div');
    text.className = 'video-loading';
    text.textContent = 'برای دیدن آخرین ویدیو کلیک کن ↗';
    fallback.appendChild(text);
    container.replaceChildren(fallback);
  }
}

function initNotifModal() {
  const overlay = document.getElementById('notif-overlay');
  const btnYes  = document.getElementById('notif-yes');
  const btnNo   = document.getElementById('notif-no');
  if (!overlay) return;

  if (localStorage.getItem('nw_notif_answered')) return;

  const timer = setTimeout(() => overlay.classList.add('show'), 3500);

  async function dismiss(enable) {
    clearTimeout(timer);
    overlay.classList.remove('show');
    localStorage.setItem('nw_notif_answered', '1');

    if (!enable || !('Notification' in window)) return;
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        localStorage.setItem('nw_notif_enabled', '1');
      }
    } catch {
      // Permission requests can fail in unsupported/restricted contexts.
    }
  }

  btnYes?.addEventListener('click', () => dismiss(true));
  btnNo?.addEventListener('click', () => dismiss(false));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) dismiss(false);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  checkLiveStatus();
  window.setInterval(checkLiveStatus, LIVE_CHECK_INTERVAL);
  loadLatestVideo();
  initNotifModal();
});
