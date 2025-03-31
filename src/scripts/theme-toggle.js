document.addEventListener('DOMContentLoaded', () => {
  // Get theme toggle buttons (both desktop and mobile/footer)
  const themeToggles = document.querySelectorAll('.theme-toggle, .theme-toggle-desktop, .theme-toggle-mobile, .theme-toggle-footer');
  
  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem('theme');
  const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    console.log('Theme set from localStorage:', savedTheme);
  } else if (systemDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
    console.log('Theme set from system preference: dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    console.log('Theme set default: light');
  }
  
  // Update toggles to match current theme
  updateToggleIcons();
  
  // Theme toggle functionality
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      console.log('Theme toggled from', currentTheme, 'to', newTheme);
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update toggle icons immediately
      updateToggleIcons();
    });
  });
  
  // Function to update toggle icons
  function updateToggleIcons() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    themeToggles.forEach(toggle => {
      const sunIcon = toggle.querySelector('.sun');
      const moonIcon = toggle.querySelector('.moon');
      
      if (sunIcon && moonIcon) {
        if (currentTheme === 'dark') {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        }
      }
    });
  }
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      updateToggleIcons();
    }
  });
}); 