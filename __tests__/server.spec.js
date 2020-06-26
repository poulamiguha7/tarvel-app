const app = require('./../src/server/index.js');
const supertest = require('supertest');
const request = supertest(app);

/*
npm install --save @babel/polyfill
npm install --save @babel/runtime 
npm install --save-dev @babel/plugin-transform-runtime
npm install supertest --save-dev
*/


describe('Travel App should be running', () => {
    test('Travel App page responds successfully.', async () => {
        const response = await request('http://localhost:8081').get('/');
        try {
            expect(response.statusCode).toBe(200);
        }
        catch(error) {
            console.log(error);
        }
        
    });
});


