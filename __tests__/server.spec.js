const app = require('./../src/server/index.js');
const supertest = require('supertest');
const request = supertest(app);



describe('Post Endpoints', () => {
    it('should save the trip', async () => {
      const res = await request(app)
        .post('/add')
        .send({
          city: 'TestCity'
        })
      expect(res.statusCode).toEqual(201);
    }),
    it('should route to index.html', async () => {
      const res = await request(app)
        .get('/')
        .send('./dist/index.html')
      expect(res.statusCode).toEqual(200);
    })
  })


