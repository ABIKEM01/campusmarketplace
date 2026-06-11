const mongoose = require("mongoose");

const FederatedCredentialSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: mongoose.Schema.Types.Mixed,
      ref: "Provider",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.String,
      ref: "Subject",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "FederatedCredential",
  FederatedCredentialSchema,
);
