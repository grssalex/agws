// Sélection des éléments du formulaire
const contactForm = document.querySelector('.contact-form');
const submitButton = contactForm?.querySelector('button[type="submit"]');
const emailInput = contactForm?.querySelector('#email');
const phoneInput = contactForm?.querySelector('#phone');
const nameInput = contactForm?.querySelector('#name');
const subjectInput = contactForm?.querySelector('#subject');
const messageInput = contactForm?.querySelector('#message');

// Fonction de validation d'email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Fonction de validation de téléphone
const isValidPhone = (phone) => {
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone);
};

// Fonction pour afficher les erreurs
const showError = (input, message) => {
  const formGroup = input.closest('.form-group');
  let errorDiv = formGroup?.querySelector('.error-message');
  
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    formGroup?.appendChild(errorDiv);
  }
  
  errorDiv.textContent = message;
  input.classList.add('error');
};

// Fonction pour effacer les erreurs
const clearError = (input) => {
  const formGroup = input.closest('.form-group');
  const errorDiv = formGroup?.querySelector('.error-message');
  if (errorDiv) {
    errorDiv.remove();
  }
  input.classList.remove('error');
};

// Validation en temps réel de l'email
if (emailInput) {
  emailInput.addEventListener('input', () => {
    if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Veuillez entrer une adresse email valide');
    } else {
      clearError(emailInput);
    }
  });
}

// Validation en temps réel du téléphone
if (phoneInput) {
  phoneInput.addEventListener('input', () => {
    if (phoneInput.value && !isValidPhone(phoneInput.value)) {
      showError(phoneInput, 'Veuillez entrer un numéro de téléphone français valide');
    } else {
      clearError(phoneInput);
    }
  });
}

// Gestion de la soumission du formulaire
if (contactForm && submitButton) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validation du nom
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Le nom est requis');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validation de l'email
    if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Veuillez entrer une adresse email valide');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validation du téléphone (si rempli)
    if (phoneInput.value && !isValidPhone(phoneInput.value)) {
      showError(phoneInput, 'Veuillez entrer un numéro de téléphone français valide');
      isValid = false;
    } else {
      clearError(phoneInput);
    }

    // Validation du sujet
    if (!subjectInput.value) {
      showError(subjectInput, 'Veuillez sélectionner un sujet');
      isValid = false;
    } else {
      clearError(subjectInput);
    }

    // Validation du message
    if (!messageInput.value.trim()) {
      showError(messageInput, 'Le message est requis');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (isValid) {
      submitButton.disabled = true;
      submitButton.innerHTML = 'Envoi en cours...';
      
      setTimeout(() => {
        submitButton.innerHTML = 'Message envoyé !';
        submitButton.style.backgroundColor = 'var(--success-color, #4CAF50)';
      }, 1000);

      contactForm.submit();
    }
  });
} 