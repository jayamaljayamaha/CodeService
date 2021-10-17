import mongoose from "mongoose";
import Code from "../../../../src/api/v1/Models/Code";

export const clearDb = () => {
  return mongoose.connection.db.collections().then((collections) => {
    return new Promise<void>((resolve, reject) => {
      collections.forEach((collection) => {
        collection.deleteMany({}).catch((err) => {
          reject(err);
        });
      });
      resolve();
    });
  });
};

export const insertCodeDataToDb = () => {
  return Code.insertMany([
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
    {
      title: "Selection Sort",
      tags: ["selection", "sort", "python"],
      category: "sorting",
      language: "python",
      code: [
        {
          lineNumber: 1,
          code: "sample code",
          indentation: 0,
        },
      ],
      codeString: "sample code",
      metaData: {
        userId: "id",
      },
    },
    {
      title: "Selection Sort",
      tags: ["selection", "sort", "java"],
      category: "searching",
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
        userId: "id",
      },
    },
  ]);
};
