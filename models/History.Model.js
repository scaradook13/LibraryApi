const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  borrowerName: {
    type: String,
    required: true,
  },
  bookTitle: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  borrowedDate: {
    type: String,
    required: true,
  },
  returnDate: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: getDateValue(),
  },
  updatedAt: {
    type: String,
    default: getDateValue(),
  },
});

function getDateValue() {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  let finaldate;

  return (finaldate = `${month} ${day}, ${year}`);
}

const History = mongoose.model("History", historySchema);
module.exports = History;