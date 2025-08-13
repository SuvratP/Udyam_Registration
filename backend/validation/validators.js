export const validateAadhaar = (aadhaar) => /^\d{12}$/.test(aadhaar);
export const validatePAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
