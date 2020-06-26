import '@babel/polyfill';
import { getCityLocation } from './../src/client/js/getCityLocation.js';

describe('Test, the function "getCityLocation()" should be a function' , () => {
    test('It should return true', async () => {
        expect(typeof getCityLocation).toBe("function");
    });
});