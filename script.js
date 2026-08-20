document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Cookie consent management ---------- */
const CONSENT_KEY = 'cookie-consent-v1';

function getConsent() {
  try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch (e) { return null; }
}
function setConsent(analytics) {
  const consent = { essential: true, analytics: !!analytics, timestamp: Date.now() };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  applyConsent(consent);
}
function applyConsent(consent) {
  if (consent.analytics) {
    loadAnalytics();
  }
}

// Analytics only loads if the visitor opted in. Replace G-XXXXXXX with your
// real Google Analytics Measurement ID when you have one.
function loadAnalytics() {
  if (window.__analyticsLoaded) return;
  window.__analyticsLoaded = true;
  const GA_ID = 'G-XXXXXXX'; // <-- put your GA4 Measurement ID here
  if (GA_ID.includes('XXXX')) {
    console.log('Analytics consent granted, but no GA Measurement ID configured yet.');
    return;
  }
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA_ID);
}

const banner = document.getElementById('cookie-banner');
const modalOverlay = document.getElementById('cookie-modal-overlay');
const analyticsToggle = document.getElementById('cm-analytics');

function showBanner() { banner.classList.remove('hidden'); }
function hideBanner() { banner.classList.add('hidden'); }
function showModal() {
  const existing = getConsent();
  analyticsToggle.checked = existing ? existing.analytics : false;
  modalOverlay.classList.remove('hidden');
}
function hideModal() { modalOverlay.classList.add('hidden'); }

const existingConsent = getConsent();
if (existingConsent) {
  applyConsent(existingConsent);
} else {
  showBanner();
}

document.getElementById('cb-accept').addEventListener('click', () => {
  setConsent(true); hideBanner();
});
document.getElementById('cb-reject').addEventListener('click', () => {
  setConsent(false); hideBanner();
});
document.getElementById('cb-settings').addEventListener('click', () => {
  showModal();
});
document.getElementById('cm-save').addEventListener('click', () => {
  setConsent(analyticsToggle.checked); hideModal(); hideBanner();
});
document.getElementById('cm-reject').addEventListener('click', () => {
  setConsent(false); hideModal(); hideBanner();
});
document.getElementById('open-cookie-settings').addEventListener('click', (e) => {
  e.preventDefault(); showModal();
});
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) hideModal();
});

['privacy-link', 'privacy-link-2'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Add your privacy policy page/content here — e.g. link this to a privacy.html page.');
  });
});
