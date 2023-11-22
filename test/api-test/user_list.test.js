const domain = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("Scenario List User Feature", function () {
  it("1. Verifying Success Get List User", async function () {
    const email = "jokotampan900@gmail.com";

    const response = await domain.get("/list-user").query({ email });

    expect(response.body.status).to.eql("SUCCESS_USER_LIST");
    expect(response.body.message).to.eql("List of registered users");
    expect(response.body).to.include.keys(
      "data",
      "message",
      "pagination",
      "status"
    );
  });
});
