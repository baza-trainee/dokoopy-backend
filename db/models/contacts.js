const { Schema, model } = require("mongoose");

const handleMongooseError = require("../../utils/handleMongooseError");

const contactSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    telegram: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", cantactSchema);

module.exports = {
  Contact,
};