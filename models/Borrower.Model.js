const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema({
  borrowerName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  bookBorrowed: {
    type: String,
    required: true,
  },
  contact: {
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

const Borrower = mongoose.model("Borrower", borrowerSchema);
module.exports = Borrower;