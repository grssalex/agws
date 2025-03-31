document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    
    // Initialiser les réponses fermées
    answer.style.maxHeight = '0';
    
    question.addEventListener('click', () => {
      // Vérifier si l'élément est actif
      const isActive = item.classList.contains('active');
      
      // Fermer tous les éléments actifs
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = '0';
          otherItem.querySelector('.faq-icon').textContent = '+';
        }
      });
      
      // Basculer l'état de l'élément actuel
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
        icon.textContent = '+';
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '×';
      }
    });
  });
}); 