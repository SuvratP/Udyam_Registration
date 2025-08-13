import { validateAadhaar, validatePAN } from '../validation/validators.js';

describe('validateAadhaar', () => {
  test('valid Aadhaar passes', () => {
    expect(validateAadhaar('123456789012')).toBe(true);
  });

  test('less than 12 digits fails', () => {
    expect(validateAadhaar('12345678901')).toBe(false);
  });

  test('more than 12 digits fails', () => {
    expect(validateAadhaar('1234567890123')).toBe(false);
  });

  test('non-numeric characters fail', () => {
    expect(validateAadhaar('1234ABC56789')).toBe(false);
  });

  test('empty string fails', () => {
    expect(validateAadhaar('')).toBe(false);
  });

  test('null or undefined fails', () => {
    expect(validateAadhaar(null)).toBe(false);
    expect(validateAadhaar(undefined)).toBe(false);
  });
});

describe('validatePAN', () => {
  test('valid PAN passes', () => {
    expect(validatePAN('ABCDE1234F')).toBe(true);
  });

  test('invalid PAN format fails', () => {
    expect(validatePAN('ABCDE12345')).toBe(false);
    expect(validatePAN('123451234F')).toBe(false);
    expect(validatePAN('ABCDE12F34')).toBe(false);
  });

  test('empty string fails', () => {
    expect(validatePAN('')).toBe(false);
  });

  test('null or undefined fails', () => {
    expect(validatePAN(null)).toBe(false);
    expect(validatePAN(undefined)).toBe(false);
  });
});
