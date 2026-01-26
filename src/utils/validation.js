/**
 * Utilitaires de validation pour les formulaires
 */

/**
 * Valide un email
 * @param {string} email - Email à valider
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, error: 'L\'email est requis' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Format d\'email invalide' };
  }

  return { isValid: true, error: null };
};

/**
 * Valide un mot de passe
 * @param {string} password - Mot de passe à valider
 * @param {number} minLength - Longueur minimale (défaut: 6)
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validatePassword = (password, minLength = 6) => {
  if (!password) {
    return { isValid: false, error: 'Le mot de passe est requis' };
  }

  if (password.length < minLength) {
    return {
      isValid: false,
      error: `Le mot de passe doit contenir au moins ${minLength} caractères`,
    };
  }

  return { isValid: true, error: null };
};

/**
 * Valide que deux mots de passe correspondent
 * @param {string} password - Mot de passe
 * @param {string} confirmPassword - Confirmation du mot de passe
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Veuillez confirmer votre mot de passe' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Les mots de passe ne correspondent pas' };
  }

  return { isValid: true, error: null };
};

/**
 * Valide un nom/prénom
 * @param {string} name - Nom à valider
 * @param {string} fieldName - Nom du champ (pour le message d'erreur)
 * @param {number} minLength - Longueur minimale (défaut: 2)
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateName = (name, fieldName = 'Ce champ', minLength = 2) => {
  if (!name || name.trim() === '') {
    return { isValid: false, error: `${fieldName} est requis` };
  }

  if (name.trim().length < minLength) {
    return {
      isValid: false,
      error: `${fieldName} doit contenir au moins ${minLength} caractères`,
    };
  }

  // Vérifier qu'il n'y a que des lettres, espaces et tirets
  const nameRegex = /^[a-zA-ZÀ-ÿ\s-]+$/;
  if (!nameRegex.test(name.trim())) {
    return {
      isValid: false,
      error: `${fieldName} ne peut contenir que des lettres`,
    };
  }

  return { isValid: true, error: null };
};

/**
 * Valide tous les champs du formulaire d'inscription
 * @param {object} formData - Données du formulaire
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateSignupForm = (formData) => {
  const { firstname, lastname, email, password, confirmPassword } = formData;
  const errors = {};

  // Valider chaque champ
  const firstnameValidation = validateName(firstname, 'Le prénom');
  if (!firstnameValidation.isValid) {
    errors.firstname = firstnameValidation.error;
  }

  const lastnameValidation = validateName(lastname, 'Le nom');
  if (!lastnameValidation.isValid) {
    errors.lastname = lastnameValidation.error;
  }

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }

  const passwordMatchValidation = validatePasswordMatch(password, confirmPassword);
  if (!passwordMatchValidation.isValid) {
    errors.confirmPassword = passwordMatchValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
