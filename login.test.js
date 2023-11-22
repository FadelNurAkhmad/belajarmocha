const request_url = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("Test Functional API Login", function () {
  // TES SCENARIO

  it("Verify Success Login with valid email and password", async function () {
    //   let random_email = Math.random().toString(36).substring(7); // Membuat random kata
    // TEST CASE
    const response = await request_url // INI BUAT NGARAH KE URL BARRU.PYTHONANYWHERE.COM
      .post("/login") // INI ENDPOINT SETELAH .COM
      .send({ email: "parjoraharjo@gmail.com", password: "parjoraharjo" }); // INI SESUAI BODY

    // VALIDASI
    expect(response.body.data).to.eql("Welcome Parjo Raharjo");
    expect(response.body.status).to.eql("SUCCESS_LOGIN");
    expect(response.body.message).to.eql("Anda Berhasil Login");
  });

  it("Verify Failed Login with invalid email and password", async function () {
    // TEST CASE
    const response = await request_url // INI BUAT NGARAH KE URL BARRU.PYTHONANYWHERE.COM
      .post("/login") // INI ENDPOINT SETELAH .COM
      .send({
        email: "contohbatch19cobagagal@gmail.com",
        password: "jokotampan900",
      }); // INI SESUAI BODY

    // VALIDASI
    expect(response.body.data).to.eql("Cek Formulir Anda");
    expect(response.body.status).to.eql("FAILED_LOGIN");
    expect(response.body.message).to.eql(
      "Email/Password melebihin maksimal karakter"
    );
  });
});
