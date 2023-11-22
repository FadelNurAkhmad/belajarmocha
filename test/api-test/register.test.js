const domain = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("Scenario Register Feature", function () {
  it("1. Verifying Failed Register With Duplicate Email Address", async function () {
    const response = await domain
      .post("/register")
      .send({ email: "coba@gmail.com", password: "coba", name: "rina" });

    expect(response.body.status).to.eql("FAILED_REGISTER");
    expect(response.body.data).to.eql(
      "Email sudah terdaftar, gunakan Email lain"
    );
    expect(response.body.message).to.eql("Gagal Registrasi");
    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.statusCode).to.eql(420);
  }).timeout(10000);

  it("2. Verifying Success Register", async function () {
    const response = await domain.post("/register").send({
      email: "momotaro@gmail.com",
      password: "rahasia",
      name: "momotaro",
    });

    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.body.data).to.eql("berhasil");
    expect(response.body.message).to.eql("created user!");
    expect(response.body.status).to.eql("SUCCESS_REGISTER");
  }).timeout(10000);

  it("3. Verifying Success Register With Random Email Address", async function () {
    let random_email = Math.random().toString(36).substring(7);

    const response = await domain.post("/register").send({
      email: random_email + "@gmail.com",
      password: random_email,
      name: random_email,
    });

    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.body.data).to.eql("berhasil");
    expect(response.body.message).to.eql("created user!");
    expect(response.body.status).to.eql("SUCCESS_REGISTER");
  }).timeout(10000);
});
