const { Schema, model } = require("mongoose");

const handleMongooseError = require("../../utils/handleMongooseError");

const partnerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
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

partnerSchema.post("save", handleMongooseError);

const Partner = model("partner", partnerSchema);

module.exports = {
  Partner,
};