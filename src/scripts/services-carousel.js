document.addEventListener('DOMContentLoaded', () => {
  const servicesGrid = document.querySelector('.services-grid');
  const serviceCards = document.querySelectorAll('.service-card');
  let currentIndex = 0;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 3000; // 3 secondes
  
  function initializeCarousel() {
    if (window.innerWidth <= 768) {
      setupCarousel();
      startAutoplay();
    } else {
      resetCarousel();
      stopAutoplay();
    }
  }
  
  function setupCarousel() {
    servicesGrid.classList.add('carousel-mode');
    serviceCards.forEach((card, index) => {
      card.classList.toggle('active', index === 0);
    });
    
    if (!document.querySelector('.carousel-dots')) {
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'carousel-dots';
      
      serviceCards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          goToSlide(index);
          resetAutoplay();
        });
        dotsContainer.appendChild(dot);
      });
      
      servicesGrid.parentNode.appendChild(dotsContainer);
    }
    
    if (!document.querySelector('.carousel-nav')) {
      const navContainer = document.createElement('div');
      navContainer.className = 'carousel-nav';
      
      const prevButton = document.createElement('button');
      prevButton.className = 'carousel-prev';
      prevButton.innerHTML = '&lsaquo;';
      prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
      
      const nextButton = document.createElement('button');
      nextButton.className = 'carousel-next';
      nextButton.innerHTML = '&rsaquo;';
      nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
      
      navContainer.appendChild(prevButton);
      navContainer.appendChild(nextButton);
      servicesGrid.parentNode.appendChild(navContainer);
    }
    
    // Ajouter les gestionnaires d'événements pour pause au survol
    servicesGrid.addEventListener('mouseenter', stopAutoplay);
    servicesGrid.addEventListener('mouseleave', startAutoplay);
    
    // Ajouter les gestionnaires pour les contrôles de navigation
    const dotsContainer = document.querySelector('.carousel-dots');
    if (dotsContainer) {
      dotsContainer.addEventListener('mouseenter', stopAutoplay);
      dotsContainer.addEventListener('mouseleave', startAutoplay);
    }
    
    const navContainer = document.querySelector('.carousel-nav');
    if (navContainer) {
      navContainer.addEventListener('mouseenter', stopAutoplay);
      navContainer.addEventListener('mouseleave', startAutoplay);
    }
  }
  
  function resetCarousel() {
    servicesGrid.classList.remove('carousel-mode');    
    serviceCards.forEach(card => {
      card.classList.remove('active');
      card.style.display = '';
    });
    
    const dots = document.querySelector('.carousel-dots');
    if (dots) dots.remove();
    
    const nav = document.querySelector('.carousel-nav');
    if (nav) nav.remove();
    
    // Supprimer les gestionnaires d'événements
    servicesGrid.removeEventListener('mouseenter', stopAutoplay);
    servicesGrid.removeEventListener('mouseleave', startAutoplay);
  }
  
  function goToSlide(index) {
    serviceCards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
    
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    currentIndex = index;
  }
  
  function nextSlide() {
    let newIndex = currentIndex + 1;
    if (newIndex >= serviceCards.length) newIndex = 0;
    goToSlide(newIndex);
  }
  
  function prevSlide() {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = serviceCards.length - 1;
    goToSlide(newIndex);
  }
  
  function startAutoplay() {
    if (!autoplayInterval) {
      autoplayInterval = setInterval(() => {
        nextSlide();
      }, AUTOPLAY_DELAY);
    }
  }
  
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }
  
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
  
  initializeCarousel();
  window.addEventListener('resize', initializeCarousel);
});