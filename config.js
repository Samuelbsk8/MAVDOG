// Public browser settings. Never add passwords, private keys, or permanent admin tokens.
window.MAVDOG_CONFIG = {
  phone: '', // Your real business number, e.g. +18035551234.
  email: '', // Your real business email.
  web3formsAccessKey: "d9e1aa0b-4c78-4f91-b4e7-e1ff65c143bd",
  apiUrl: 'https://mavdog-server-testimonials.onrender.com',
  // Review writes require a backend. Admin mode is NOT authentication.
  enableReviewSubmissions: false,
  enableReviewManagement: false,
  // Use 'include' only when your API uses an authenticated cross-origin cookie session.
  apiCredentials: 'omit',
  slideshowInterval: 5000,
  // If nonempty, this list takes priority over the generated images/slideshow list.
  slideshowImages: []
};
