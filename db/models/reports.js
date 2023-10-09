const { Schema, model } = require("mongoose");

const handleMongooseError = require("../../utils/handleMongooseError");

const reportSchema = new Schema(
  {
    report: {
      data: Buffer,
      contentType: String,
    },
  },
  { versionKey: false, timestamps: true }
);

reportSchema.post("save", handleMongooseError);

const Report = model("report", reportSchema);

module.exports = {
  Report,
  reportSchema
};