document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.site-header__menu-toggle');
  const nav = document.querySelector('.site-header__nav');
  const overlay = document.querySelector('.site-overlay');
  
  if (menuToggle && nav && overlay) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    overlay.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
    const navLinks = document.querySelectorAll('.site-header__nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }
  
  initDarkMode();
});
  
function initDarkMode() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  const savedTheme = localStorage.getItem('theme');
  const initialTheme = savedTheme || (prefersDark.matches ? 'dark' : 'light');
  
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
  setTheme(initialTheme);
  
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  });
  
  themeToggles.forEach(toggle => {
    toggle.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      localStorage.removeItem('theme');
      setTheme(prefersDark.matches ? 'dark' : 'light');
      alert('Thème réinitialisé au mode système');
    });
  });
  
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}