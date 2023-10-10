const { Schema, model } = require("mongoose");

const handleMongooseError = require("../../utils/handleMongooseError");

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    title_eng: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    description_eng: {
      type: String,
      required: true,
    },
    imageURL: {
      type: Buffer,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

projectSchema.post("save", handleMongooseError);

const Project = model("project", projectSchema);

module.exports = {
  Project,
};