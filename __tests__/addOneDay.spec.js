
import { addOneday } from './../src/client/js/util.js';
describe("addOneday function", () => {
    test("Test addOneday function returns correct date", () => {
      const input = '2020-06-03';
      const output = '2020-06-04';
      expect(addOneday(input)).toEqual(output);
    });
  }
  
  );