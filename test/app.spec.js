require("dotenv").configure;
const supertest = require("supertest");
const app = require("../app.js");

describe("GET /", function() {
  it("it should have status code 200", function(done) {
    supertest(app)
      .get("/")
      .expect(200)
      .end(function(error, res) {
        if (error) done(error);
        done();
      });
  });
});

// describe("POST /", function() {
//   it("it should return status code 200 as query exists", function(done) {
//     supertest(app)
//       .post("/search")
//       .send({ query: "brexit" })
//       .expect(200)
//       .end(function(error, res) {
//         if (error) done(error);
//         done();
//       });
//   });
// });

describe("GET /", function() {
  it("it should return status code 404", function(done) {
    supertest(app)
      .get("/nothing")
      .expect(404)
      .end(function(error, res) {
        if (error) done(error);
        done();
      });
  });
});
