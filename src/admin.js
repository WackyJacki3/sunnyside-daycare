var KEY = 'sunnyside-cms';
var PASSWORD = 'sunnyside2026';
var SESSION_KEY = 'sunnyside-admin-auth';

var lockScreen  = document.getElementById('lockScreen');
var adminPanel  = document.getElementById('adminPanel');
var lockPwdEl   = document.getElementById('lockPassword');
var lockSubmit  = document.getElementById('lockSubmit');
var lockError   = document.getElementById('lockError');
var lockOut     = document.getElementById('lockOut');
var saveBtn     = document.getElementById('saveBtn');
var resetBtn    = document.getElementById('resetBtn');
var saveStatus  = document.getElementById('saveStatus');

function showAdmin() {
  lockScreen.hidden = true;
  adminPanel.hidden = false;
  loadValues();
}

function showLock() {
  lockScreen.hidden = false;
  adminPanel.hidden = true;
  sessionStorage.removeItem(SESSION_KEY);
}

lockSubmit.addEventListener('click', function () {
  if (lockPwdEl.value === PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, '1');
    lockError.textContent = '';
    showAdmin();
  } else {
    lockError.textContent = 'Incorrect password.';
    lockPwdEl.value = '';
    lockPwdEl.focus();
  }
});

lockPwdEl.addEventListener('keydown', function (e) { if (e.key === 'Enter') lockSubmit.click(); });
lockOut.addEventListener('click', showLock);

function loadValues() {
  var d = {};
  try { d = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
  document.getElementById('f-phone').value          = d.phone           || '';
  document.getElementById('f-email').value          = d.email           || '';
  document.getElementById('f-address').value        = d.address         || '';
  document.getElementById('f-hero-subtext').value   = d['hero-subtext'] || '';
  document.getElementById('f-img-hero').value       = d['img-hero']     || '';
  document.getElementById('f-img-day').value        = d['img-day']      || '';
}

saveBtn.addEventListener('click', function () {
  var raw = {
    phone:          document.getElementById('f-phone').value.trim(),
    email:          document.getElementById('f-email').value.trim(),
    address:        document.getElementById('f-address').value.trim(),
    'hero-subtext': document.getElementById('f-hero-subtext').value.trim(),
    'img-hero':     document.getElementById('f-img-hero').value.trim(),
    'img-day':      document.getElementById('f-img-day').value.trim()
  };
  var data = {};
  Object.keys(raw).forEach(function (k) { if (raw[k]) data[k] = raw[k]; });
  if (data.address) data['address-inline'] = data.address.replace(/\n/g, ', ');
  localStorage.setItem(KEY, JSON.stringify(data));
  flash('✓ Saved', 'ok');
});

resetBtn.addEventListener('click', function () {
  if (!confirm('Reset all content to defaults? This will clear your saved changes.')) return;
  localStorage.removeItem(KEY);
  loadValues();
  flash('Reset to defaults', 'warn');
});

function flash(msg, cls) {
  saveStatus.textContent = msg;
  saveStatus.className = 'save-status ' + cls;
  setTimeout(function () { saveStatus.textContent = ''; saveStatus.className = 'save-status'; }, 2500);
}

// Section navigation
document.querySelectorAll('.admin-nav-link').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    var target = this.getAttribute('data-section');
    document.querySelectorAll('.admin-nav-link').forEach(function (l) { l.classList.remove('active'); });
    this.classList.add('active');
    document.querySelectorAll('.admin-section').forEach(function (s) { s.hidden = true; });
    document.getElementById(target).hidden = false;
  });
});

if (sessionStorage.getItem(SESSION_KEY) === '1') showAdmin();
