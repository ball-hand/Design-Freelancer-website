const request = require('supertest');
const app = require('../server');
const pool = require('../database'); // Sesuaikan dengan konfigurasi database Anda

describe('Project Management API', () => {
  let projectId;

  afterAll(async () => {
    await pool.end();
  });

  test('should create a new project', async () => {
    const response = await request(app)
      .post('/api/projects')
      .send({
        headline: 'New Project',
        budget: 1000,
        description: 'This is a test project',
        attachment: 'http://example.com/attachment',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.headline).toBe('New Project');
    projectId = response.body.id;
  });

  test('should update the created project', async () => {
    const response = await request(app)
      .put(`/api/projects/${projectId}`)
      .send({
        headline: 'Updated Project',
        budget: 2000,
        description: 'This is an updated test project',
        attachment: 'http://example.com/updated-attachment',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.headline).toBe('Updated Project');
    expect(response.body.budget).toBe(2000);
  });

  test('should delete the updated project', async () => {
    const response = await request(app)
      .delete(`/api/projects/${projectId}`);

    expect(response.statusCode).toBe(204);

    const getResponse = await request(app)
      .get(`/api/projects/${projectId}`);

    expect(getResponse.statusCode).toBe(404);
  });
});
