function toggleMenu() {
    document.getElementById('mobileNav').classList.toggle('open');
  }

  function handleSubmit(btn) {
    const form = btn.closest('.contact-form');
    const inputs = form.querySelectorAll('input, textarea, select');
    const name    = inputs[0].value.trim();
    const contact = inputs[1].value.trim();
    const service = inputs[2].value || 'Not specified';
    const message = inputs[3].value.trim();

    if (!name || !contact) {
      inputs[0].style.borderColor = !name    ? '#ef4444' : '';
      inputs[1].style.borderColor = !contact ? '#ef4444' : '';
      return;
    }

    const subject = encodeURIComponent('Quote Request – ' + service);
    const body    = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Contact: ' + contact + '\n' +
      'Service Needed: ' + service + '\n\n' +
      'Message:\n' + (message || '(none)')
    );

    window.location.href = 'mailto:contact@ojasintl.com.np?subject=' + subject + '&body=' + body;

    btn.textContent = '✓ Opening Email…';
    btn.style.background = 'linear-gradient(135deg,#15803d,#22c55e)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.disabled = false;
      inputs.forEach(i => { i.style.borderColor = ''; if (i.tagName !== 'SELECT') i.value = ''; });
    }, 3500);
  }

  // Scroll reveal
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Nav active highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#'+cur ? '#fcd34d' : '';
    });
  }, { passive: true });