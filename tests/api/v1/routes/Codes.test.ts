import { response } from "express";
import { assert } from "joi";
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

describe("POST /api/v1/codes", () => {
  const dummyCode = [
    {
      title: "Bubble Sort",
      tags: ["bubble", "sort", "java"],
      category: "sorting",
      language: "java",
      code: "sample code",
      metaData: {
        userId: "sdf",
      },
    },
  ];

  const invalidDummyCode = [
    {
      tags: ["bubble", "sort", "java"],
      language: "java",
      code: "sample code",
      metaData: {
        userId: "sdf",
      },
    },
  ];

  beforeAll((done) => {
    clearDb()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return 201 on successfully inserting code", (done) => {
    request(app).post("/api/v1/codes").send(dummyCode).expect(201, done);
  });

  it("Should return data on successfully inserting code", (done) => {
    request(app)
      .post("/api/v1/codes")
      .send(dummyCode)
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body).toHaveLength(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return 400 error on sending invalid data body", (done) => {
    request(app).post("/api/v1/codes").send(invalidDummyCode).expect(400, done);
  });
});

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
