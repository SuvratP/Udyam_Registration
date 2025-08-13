import request from 'supertest';
import app from '../app.js';  // <-- import app, not router

describe('POST /api/aadhaar', () => {
  it('should return 400 for invalid Aadhaar', async () => {
    const res = await request(app)
      .post('/api/aadhaar')
      .send({ aadhaarNumber: '123', applicantName: 'Test' });

    expect(res.statusCode).toBe(400);
  });

  it('should return 200 for valid Aadhaar', async () => {
    const res = await request(app)
      .post('/api/aadhaar')
      .send({ aadhaarNumber: '123456789012', applicantName: 'Test User' });

    expect(res.statusCode).toBe(200);
  });
});
