const mongoose = require('mongoose');

module.exports = mongoose.model(
  'File',
  new mongoose.Schema(
    {
      name: {
        type: String,
      },
      src: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      filename: {
        type: String,
      },
      subject: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
