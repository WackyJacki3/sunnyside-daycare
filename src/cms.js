(function () {
  function apply(data) {
    if (data.address && !data['address-inline']) {
      data['address-inline'] = data.address.replace(/\n/g, ', ');
    }

    document.querySelectorAll('[data-cms]').forEach(function (el) {
      var v = data[el.getAttribute('data-cms')];
      if (v) el.textContent = v;
    });

    document.querySelectorAll('[data-cms-html]').forEach(function (el) {
      var v = data[el.getAttribute('data-cms-html')];
      if (v) el.innerHTML = v.replace(/\n/g, '<br>');
    });

    document.querySelectorAll('[data-cms-tel]').forEach(function (el) {
      var v = data[el.getAttribute('data-cms-tel')];
      if (v) { el.textContent = v; el.href = 'tel:' + v.replace(/\D/g, ''); }
    });

    document.querySelectorAll('[data-cms-email]').forEach(function (el) {
      var v = data[el.getAttribute('data-cms-email')];
      if (v) { el.textContent = v; el.href = 'mailto:' + v; }
    });

    document.querySelectorAll('[data-cms-img]').forEach(function (el) {
      var v = data[el.getAttribute('data-cms-img')];
      if (v) el.setAttribute('src', v);
    });
  }

  // Production: fetch from content.json (committed to repo, served by Netlify)
  fetch('/content.json')
    .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
    .then(apply)
    .catch(function () {
      // Local preview fallback: use admin.html localStorage values
      try {
        var local = JSON.parse(localStorage.getItem('sunnyside-cms') || '{}');
        if (Object.keys(local).length) apply(local);
      } catch (e) {}
    });
})();
