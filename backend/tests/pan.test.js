import request from 'supertest';
import app from '../app.js';

describe('POST /api/pan', () => {
  it('should return 400 for invalid PAN', async () => {
    const res = await request(app)
      .post('/api/pan')
      .send({
        aadhaarNumber: '123456789012',
        panNumber: 'INVALIDPAN',
        organisation_type: 'individual',
        pan_holder_name: 'Test User',
        dob_doi: '1990-01-01',
        pan_consent: true,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Invalid PAN/i);
  });

  it('should return 404 if Aadhaar not found', async () => {
    const res = await request(app)
      .post('/api/pan')
      .send({
        aadhaarNumber: '999999999999',
        panNumber: 'ABCDE1234F',
        organisation_type: 'individual',
        pan_holder_name: 'Test User',
        dob_doi: '1990-01-01',
        pan_consent: true,
      });
    expect(res.statusCode).toBe(404);
  });
});
