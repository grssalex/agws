document.addEventListener('DOMContentLoaded', () => {
  // Get theme toggle buttons (both desktop and mobile/footer)
  const themeToggles = document.querySelectorAll('.theme-toggle, .theme-toggle-desktop, .theme-toggle-mobile, .theme-toggle-footer');
  
  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem('theme');
  const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (systemDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  // Theme toggle functionality
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  });
}); 