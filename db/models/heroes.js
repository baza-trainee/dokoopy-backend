const { Schema, model } = require("mongoose");

const handleMongooseError = require("../../utils/handleMongooseError");

const heroSchema = new Schema(
  {
    title: {
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
    image: {
      type: Buffer,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

heroSchema.post("save", handleMongooseError);

const Hero = model("hero", heroSchema);

module.exports = {
  Hero,
};