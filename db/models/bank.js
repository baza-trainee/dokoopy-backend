const { Schema, model } = require("mongoose");

const handleMongooseError = require("../../utils/handleMongooseError");

const bankSchema = new Schema(
  {
    link: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

bankSchema.post("save", handleMongooseError);

const Bank = model("bank", bankSchema);

module.exports = {
  Bank,
};