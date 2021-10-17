import request from "supertest";
import app from "../../../../src/api/v1/App";
import axios from "axios";
import { clearDb } from "../Config/CommonConfigs";
import { Role } from "@randomn/drescode-common";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("POST /api/v1/codes", () => {
  const dummyCode = [
    {
      title: "Bubble Sort",
      tags: ["bubble", "sort", "java"],
      category: "sorting",
      language: "java",
      code: [
        {
          lineNumber: 1,
          code: "sample code",
          indentation: 0,
        },
      ],
      codeString: "sample code",
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

  const currentNormalUser = {
    data: {
      currentUser: {
        user: {
          id: "mock",
          email: "test@gmail.com",
          firstname: "Rob",
          lastname: "Williams",
          role: Role.USER,
        },
        token: "testtoken123456",
      },
    },
  };

  const currentAdminUser = {
    data: {
      currentUser: {
        user: {
          id: "mock",
          email: "test@gmail.com",
          firstname: "Rob",
          lastname: "Williams",
          role: Role.ADMIN,
        },
        token: "testtoken123456",
      },
    },
  };

  const currentModeratorUser = {
    data: {
      currentUser: {
        user: {
          id: "mock",
          email: "test@gmail.com",
          firstname: "Rob",
          lastname: "Williams",
          role: Role.MODERATOR,
        },
        token: "testtoken123456",
      },
    },
  };

  beforeAll((done) => {
    clearDb()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return data with status code 201 on successfully inserting code by Admin user", (done) => {
    mockedAxios.get.mockResolvedValue(currentAdminUser);
    request(app)
      .post("/api/v1/codes")
      .set("Authorization", `Bearer ${currentAdminUser.data.currentUser.token}`)
      .send(dummyCode)
      .expect(201)
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body).toHaveLength(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return data with status code 201 on successfully inserting code by Moderator user", (done) => {
    mockedAxios.get.mockResolvedValue(currentModeratorUser);
    request(app)
      .post("/api/v1/codes")
      .set(
        "Authorization",
        `Bearer ${currentModeratorUser.data.currentUser.token}`
      )
      .send(dummyCode)
      .expect(201)
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body).toHaveLength(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return 401 error on inserting code by normal user", (done) => {
    mockedAxios.get.mockResolvedValue(currentNormalUser);
    request(app)
      .post("/api/v1/codes")
      .set(
        "Authorization",
        `Bearer ${currentNormalUser.data.currentUser.token}`
      )
      .send(dummyCode)
      .expect(401, done);
  });

  it("Should return 400 error on sending invalid data body with authorized user", (done) => {
    mockedAxios.get.mockResolvedValue(currentAdminUser);
    request(app)
      .post("/api/v1/codes")
      .set("Authorization", `Bearer ${currentAdminUser.data.currentUser.token}`)
      .send(invalidDummyCode)
      .expect(400, done);
  });
});
