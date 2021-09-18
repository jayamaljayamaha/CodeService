import { response } from "express";
import { AddCodeInterface } from "../../../../src/api/v1/DataTypes/Types";
import {
  addNewCode,
  getAll,
  searchCodeByCategory,
  searchCodeByTags,
  validateData,
} from "../../../../src/api/v1/Services/CodesService";
import AddCodeSchema from "../../../../src/api/v1/ValidationSchemas/AddCodeSchema";
import { clearDb, insertCodeDataToDb } from "../Config/CommonConfigs";

describe("getAll() in CodeService", () => {
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

  it("Should return a promise with all the data in database", (done) => {
    getAll().then((response) => {
      expect(response).toHaveLength(3);
      done();
    });
  });
});

describe("addNewCode() in CodeService", () => {
  const dummyCode: AddCodeInterface = {
    title: "Bubble Sort",
    tags: ["bubble", "sort", "java"],
    category: "sorting",
    language: "java",
    code: "sample code",
    metaData: {
      userId: "sdf",
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

  it("Should return a promise with the array of data that we sent to that function", (done) => {
    addNewCode([dummyCode]).then((response: any) => {
      expect(response).toHaveLength(1);
      expect(response[0].title).toEqual(dummyCode.title);
      done();
    });
  });
});

describe("validateData() in CodeService", () => {
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

  it("Should return data with error field undefined for valid data", (done) => {
    const isValid = validateData(dummyCode, AddCodeSchema);
    expect(isValid.error).not.toBeDefined();
    done();
  });

  it("Should return data with error field defined for invalid data", (done) => {
    const isValid = validateData(invalidDummyCode, AddCodeSchema);
    expect(isValid.error).toBeDefined();
    done();
  });
});

describe("searchCodeByTags() in CodeService", () => {
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

  it("Should return promise with one data object when searchTags = bubble,sort", (done) => {
    searchCodeByTags("bubble,sort")
      .then((response) => {
        expect(response).toHaveLength(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return promise with three data objects when searchTags = sort", (done) => {
    searchCodeByTags("sort")
      .then((response) => {
        expect(response).toHaveLength(3);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return promise with zero data object when searchTags = merge,sort", (done) => {
    searchCodeByTags("merge,sort")
      .then((response) => {
        expect(response).toHaveLength(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("searchCodeByCategory() in CodeService", () => {
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

  it("Should return promise with two data objects when searchCategory = sorting", (done) => {
    searchCodeByCategory("sorting")
      .then((response) => {
        expect(response).toHaveLength(2);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return promise with zero data objects when searchCategory = linked-list", (done) => {
    searchCodeByCategory("linked-list")
      .then((response) => {
        expect(response).toHaveLength(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
