import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  tags: {
    type: [String],
    required: true,
  },

  code: {
    type: [
      {
        lineNumber: {
          type: Number,
          required: true,
        },
        code: {
          type: String,
          required: true,
        },
        indentation: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },

  codeString: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  language: {
    type: String,
    required: true,
  },

  metaData: {
    userId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastUpdated: {
      type: mongoose.Schema.Types.Date,
      default: Date.now,
    },
    numberOfTimesUpdated: {
      type: Number,
      default: 0,
    },
  },
  updateHistory: {
    type: [
      {
        userId: {
          type: String,
        },
        UpdatedAt: {
          type: Date,
        },
      },
    ],
    default: [],
  },
});

codeSchema.set("versionKey", "version");

const Code = mongoose.model("code", codeSchema);

export default Code;
