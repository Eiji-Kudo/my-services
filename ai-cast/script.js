function updateDisplay() {
  var hash = location.hash;
  var slides = document.querySelectorAll('section');
  if (hash && document.querySelector(hash)) {
    slides.forEach(function(s) { s.style.display = 'none'; });
    document.querySelector(hash).style.display = 'flex';
    document.body.style.padding = '0';
    document.body.style.gap = '0';
  } else {
    slides.forEach(function(s) { s.style.display = ''; });
    document.body.style.padding = '';
    document.body.style.gap = '';
  }
}
window.addEventListener('hashchange', updateDisplay);
updateDisplay();
