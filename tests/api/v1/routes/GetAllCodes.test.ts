import request from "supertest";
import app from "../../../../src/api/v1/App";
import { clearDb, insertCodeDataToDb } from "../Config/CommonConfigs";

describe("GET /api/v1/codes", () => {
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

  it("Should return 200 on successfull retrieving all the codes", (done) => {
    request(app)
      .get("/api/v1/codes")
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(3);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return array of size three on successfull retrieving all the codes", (done) => {
    request(app)
      .get("/api/v1/codes")
      .then((response) => {
        expect(response.body).toHaveLength(3);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
