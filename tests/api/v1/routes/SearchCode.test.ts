import request from "supertest";
import app from "../../../../src/api/v1/App";
import { clearDb, insertCodeDataToDb } from "../Config/CommonConfigs";

describe("GET /api/v1/codes/search", () => {
  beforeAll((done) => {
    clearDb()
      .then(() => {
        return insertCodeDataToDb();
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return one result with 200 status code when search by tags=bubble,sort", (done) => {
    request(app)
      .get("/api/v1/codes/search")
      .query({ tags: "bubble,sort" })
      .expect(200)
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body).toHaveLength(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return two results with 200 status code when search by category=sorting", (done) => {
    request(app)
      .get("/api/v1/codes/search")
      .query({ category: "sorting" })
      .expect(200)
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body).toHaveLength(2);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return 400 error code when query string is not defined", (done) => {
    request(app).get("/api/v1/codes/search").expect(400, done);
  });

  it("Should return 400 error code when both tags and caregory query string are defined", (done) => {
    request(app)
      .get("/api/v1/codes/search")
      .query({ tags: "bubble,sort", category: "sorting" })
      .expect(400, done);
  });
});
