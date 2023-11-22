const url = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("Verify Delete User", function () {
  it("1. Delete User Berhasil", async function () {
    const responseLogin = await url
      .post("/login")
      .send({ email: "baraungkep1@gmail.com", password: "baraungkep" });

    const authToken = responseLogin.body.credentials.access_token;
    const response = await url
      .del("/delete-user")
      .set("Authorization", `${authToken}`)
      .send({ password: "baraungkep" });

    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.body.data).to.eql("Sedih melihatmu pergi BaraUngkep");
    expect(response.body.message).to.eql("Berhasil Hapus User");
    expect(response.body.status).to.eql("SUCCESS_DELETE_PROFILE");
  });

  it("2. Delete User Gagal", async function () {
    const responseLogin = await url
      .post("/login")
      .send({ email: "baraungkep2@gmail.com", password: "baraungkep" });

    const authToken = responseLogin.body.credentials.access_token;
    const response = await url
      .del("/delete-user")
      .set("Authorization", `${authToken}`)
      .send({ password: "bara@ungkep" });

    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.body.data).to.eql("Nama tidak valid");
    expect(response.body.message).to.eql("Tidak boleh mengandung symbol");
    expect(response.body.status).to.eql("FAILED_DELETE_PROFILE");
  });
});
