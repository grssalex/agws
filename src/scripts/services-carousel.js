document.addEventListener('DOMContentLoaded', () => {
  const cardGrid = document.querySelector('.card-grid');
  const cards = document.querySelectorAll('.card');
  let currentIndex = 0;
  function initializeCarousel() {
    if (window.innerWidth <= 768) {
      setupCarousel();
    } else {
      resetCarousel();
    }
  }
  
  function setupCarousel() {
    cardGrid.classList.add('carousel-mode');
    cards.forEach((card, index) => {
      card.classList.toggle('active', index === 0);
    });
        if (!document.querySelector('.carousel-dots')) {
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'carousel-dots';
      
      cards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
      
      cardGrid.parentNode.appendChild(dotsContainer);
    }
      if (!document.querySelector('.carousel-nav')) {
      const navContainer = document.createElement('div');
      navContainer.className = 'carousel-nav';
      
      const prevButton = document.createElement('button');
      prevButton.className = 'carousel-prev';
      prevButton.innerHTML = '&lsaquo;';
      prevButton.addEventListener('click', prevSlide);
      
      const nextButton = document.createElement('button');
      nextButton.className = 'carousel-next';
      nextButton.innerHTML = '&rsaquo;';
      nextButton.addEventListener('click', nextSlide);
      
      navContainer.appendChild(prevButton);
      navContainer.appendChild(nextButton);
      cardGrid.parentNode.appendChild(navContainer);
    }
  }
  
  function resetCarousel() {
    cardGrid.classList.remove('carousel-mode');    
    cards.forEach(card => {
      card.classList.remove('active');
      card.style.display = '';
    });
    const dots = document.querySelector('.carousel-dots');
    if (dots) dots.remove();
    const nav = document.querySelector('.carousel-nav');
    if (nav) nav.remove();
  }
  function goToSlide(index) {
    cards.forEach((card, i) => {
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
    if (newIndex >= cards.length) newIndex = 0;
    goToSlide(newIndex);
  }
  
  function prevSlide() {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = cards.length - 1;
    goToSlide(newIndex);
  }
    initializeCarousel();
    window.addEventListener('resize', initializeCarousel);
});