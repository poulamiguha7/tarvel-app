import 'regenerator-runtime/runtime';
import { getLastYearDay } from './../src/client/js/util.js';
//const fetch = require("node-fetch");

describe("getLastYearDay function", () => {
    test("Test getLastYearDay function returns correct date", () => {
      const input = '2020-06-03';
      const output = '2019-06-03';
      expect(getLastYearDay(input)).toEqual(output);
    });
  }
  
  );
