const app = require("../app/calculator");
const supertest = require("supertest");
const { ceilBMI } = require('../app/helper');

// beforeEach((done) => {
//   //
// });

// afterEach((done) => {
//   //
// });


test("GET /calculate", async () => {
  await supertest(app).get("/calculate")
    .expect(200)
    .then((response) => {
      const data = require("../app/data.json")
      const table = require("../app/table1.json")
      
      // Check type and length
      expect(response.body).toBeDefined();

      // Check data
      expect(response.body.observation).toBeDefined();
      expect(Array.isArray(response.body.result)).toBeTruthy();
      expect(response.body.result.length).toBe(data.length);
      // confirm value for one of the patient
      let p1 = data[0]
      let BMI = p1.WeightKg / Math.pow((p1.HeightCm/100), 2);
      let table_data = table[ceilBMI(BMI)]
      expect(response.body.result[0].Category).toBe(table_data.Category);
      expect(response.body.result[0].HealthRisk).toBe(table_data.HealthRisk);
    });
});