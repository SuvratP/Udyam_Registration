import request from 'supertest';
import app from '../app.js'; // Your Express app

describe('POST /api/aadhaar', () => {
  it('should return 400 for invalid Aadhaar', async () => {
    const res = await request(app)
      .post('/api/aadhaar')
      .send({ aadhaarNumber: '123', applicantName: 'Test User' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Invalid Aadhaar/i);
  });

  it('should return 400 for empty Aadhaar', async () => {
    const res = await request(app)
      .post('/api/aadhaar')
      .send({ aadhaarNumber: '', applicantName: 'Test User' });
    expect(res.statusCode).toBe(400);
  });

  it('should return 200 for valid Aadhaar', async () => {
    const res = await request(app)
      .post('/api/aadhaar')
      .send({ aadhaarNumber: '123456789012', applicantName: 'Test User' });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/OTP sent|OTP resent/i);

    expect(res.body.otp).toHaveLength(6);
  });
});
